import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { 
  SYSTEM_PROMPT, 
  detectCrisis, 
  CRISIS_RESPONSE, 
  saveMessage 
} from '@/services/ai-service';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages are required and must be an array' }), { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];

    // Check if GROQ_API_KEY exists
    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is missing');
      return new Response(JSON.stringify({ 
        role: 'assistant', 
        content: "I'm having trouble connecting to my brain right now. Please make sure the GROQ_API_KEY is set in the settings." 
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // 1. Safety Check
    if (detectCrisis(lastMessage.content)) {
      return new Response(JSON.stringify({ 
        role: 'assistant', 
        content: CRISIS_RESPONSE,
        isCrisis: true 
      }), { headers: { 'Content-Type': 'application/json' } });
    }

    // 2. Save User Message (Non-blocking)
    if (sessionId) {
      saveMessage(sessionId, 'user', lastMessage.content).catch(console.error);
    }

    // 3. Generate AI Response (Non-streaming for maximum reliability)
    try {
      const { text } = await generateText({
        model: groq('llama3-8b-8192'),
        system: SYSTEM_PROMPT,
        messages,
      });

      // 4. Save AI Response (Non-blocking)
      if (sessionId) {
        saveMessage(sessionId, 'ai', text).catch(console.error);
      }

      // Return as a standard JSON response that useChat can handle
      // useChat expects either a stream or a message-like object if handled manually, 
      // but since we are using standard useChat, it expects a stream.
      // To work with generateText (non-streaming), we should return a Response 
      // but useChat might need a bit of a trick or we just return the text.
      // Actually, useChat works best with streamText. Let's switch back to streamText
      // BUT with Groq and better error handling.
      
      return new Response(JSON.stringify({ role: 'assistant', content: text }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (aiError: any) {
      console.error('AI Generation Error:', aiError);
      return new Response(JSON.stringify({ 
        role: 'assistant', 
        content: "I'm sorry, I'm experiencing some technical difficulties. My model might be overloaded or the API key is invalid. Details: " + aiError.message
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Harmony Hub AI Error', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
