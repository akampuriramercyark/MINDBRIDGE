import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export const maxDuration = 30;

const AFFIRMATION_PROMPT = `
You are Sanyu, an AI wellness companion for Harmony Hub.
Your goal is to generate a short, powerful, and culturally relevant affirmation for a young person in Africa (specifically Uganda).

The affirmation should:
1. Be concise (1-2 sentences).
2. Feel modern, warm, and empowering.
3. Use a touch of local flavor (e.g., Mentioning resilience, community, or occasionally using a Luganda word like "Mirembe", "Webale", or "Guma").
4. Address common struggles like career pressure, family expectations, loneliness, or burnout if a mood is provided.

If a mood is provided, tailor the affirmation to that mood.
Mood: `;

export async function POST(req: Request) {
  try {
    const { mood } = await req.json();

    const prompt = mood 
      ? AFFIRMATION_PROMPT + mood
      : AFFIRMATION_PROMPT + "General wellness and empowerment";

    console.log('Attempting to use model: gemini-1.5-flash-latest');

    const { text } = await generateText({
      model: google('gemini-1.5-flash-latest'),
      prompt: prompt,
    });

    return new Response(JSON.stringify({ affirmation: text.trim() }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Affirmation API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate affirmation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
