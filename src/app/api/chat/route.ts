import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { 
  SYSTEM_PROMPT, 
  detectCrisis, 
  CRISIS_RESPONSE, 
  saveMessage 
} from '@/services/ai-service';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, sessionId } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // 1. Safety Check (Crisis Detection)
    if (detectCrisis(lastMessage.content)) {
      // Save the user message first
      await saveMessage(sessionId, 'user', lastMessage.content);
      
      // Save the crisis response
      await saveMessage(sessionId, 'ai', CRISIS_RESPONSE);

      // Return a non-streaming response for crisis
      return new Response(JSON.stringify({ 
        role: 'ai', 
        content: CRISIS_RESPONSE,
        isCrisis: true 
      }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Save User Message to Database
    await saveMessage(sessionId, 'user', lastMessage.content);

    // 3. Prepare AI Response with Streaming
    const result = streamText({
      model: google('models/gemini-1.5-flash'),
      system: SYSTEM_PROMPT,
      messages,
      onFinish: async (event) => {
        // 4. Save AI Response to Database on Finish
        await saveMessage(sessionId, 'ai', event.text);
      },
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
