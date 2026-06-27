import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
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

    // 3. Stream AI Response
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages,
      onFinish: async ({ text }) => {
        if (sessionId) {
          saveMessage(sessionId, 'ai', text).catch(console.error);
        }
      },
    });

    return result.toTextStreamResponse();

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
