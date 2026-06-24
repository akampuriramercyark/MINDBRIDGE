import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

const MODERATION_PROMPT = `
You are a content moderator for MindBridge, an emotional wellness platform for young people in Africa.
Your task is to analyze the following community post and determine if it violates our safety guidelines.

Safety Guidelines:
1. No hate speech or discrimination.
2. No explicit sexual content.
3. No promotion of illegal activities.
4. No severe harassment or bullying.
5. No spam or deceptive content.

Note: Discussions about mental health struggles, sadness, loneliness, or heartbreak are ALLOWED and ENCOURAGED, as long as they don't involve active promotion of self-harm (which is handled by a separate crisis detector).

Respond strictly in JSON format:
{
  "isSafe": boolean,
  "reason": "string (optional, why it was flagged)",
  "suggestedAction": "allow" | "flag" | "block"
}

Post Content:
`;

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content) {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      prompt: MODERATION_PROMPT + content,
    });

    // Clean up the response in case the model adds markdown formatting
    const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(jsonStr);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Moderation API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process moderation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
