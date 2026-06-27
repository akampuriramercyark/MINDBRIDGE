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
    const lastMessage = messages[messages.length - 1];

    // 1. Safety Check
    if (detectCrisis(lastMessage.content)) {
      return new Response(JSON.stringify({ 
        role: 'ai', 
        content: CRISIS_RESPONSE,
        isCrisis: true 
      }), { headers: { 'Content-Type': 'application/json' } });
    }

    // 2. Save User Message (Non-blocking)
    if (sessionId) {
      saveMessage(sessionId, 'user', lastMessage.content).catch(console.error);
    }

    // 3. Generate AI Response (Non-streaming for maximum reliability)
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      system: SYSTEM_PROMPT,
      messages,
    });

    // 4. Save AI Response (Non-blocking)
    if (sessionId) {
      saveMessage(sessionId, 'ai', text).catch(console.error);
    }

    // Return as a standard JSON response
    return new Response(JSON.stringify({ role: 'assistant', content: text }), {
      headers: { 'Content-Type': 'application/json' },
    });

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
