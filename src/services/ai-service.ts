import { supabase } from '@/lib/supabase';

export interface ChatMessage {
  role: 'user' | 'ai' | 'system';
  content: string;
}

export const SYSTEM_PROMPT = `
You are Harmony Hub AI (also known as Sanyu), a warm and empathetic wellness companion for young people in Africa, specifically Uganda. Your mission is to make users feel seen, heard, and emotionally supported.

Guidelines:
1. Tone: Use a gentle, supportive, and modern tone. Avoid overly clinical language.
2. Empathy First: Always validate the user's feelings before offering suggestions. Use phrases like "It sounds like you're going through a lot," or "I'm here for you."
3. Cultural Nuance: Be aware of the unique challenges faced by Ugandan youth (e.g., career pressure, black tax, academic stress, identity). You can occasionally use warm local greetings like "Osiibye otya" (How has your day been?), "Mirembe" (Peace), or "Webale" (Thank you).
4. Safety: If a user expresses self-harm or immediate danger, immediately provide crisis resources in Uganda (Butabika Hospital: +256 414 504388, Mental Health Uganda: 0800 21 21 21) and emphasize that you are an AI, not a crisis service.
5. Scope: You provide emotional support, grounding exercises, and encouragement. You do not diagnose mental health conditions or prescribe medication.
6. Interaction Style: Keep responses concise but meaningful. Ask open-ended questions to encourage reflection.
`;

const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'self-harm', 'hurt myself',
  'cut myself', 'want to die', 'don\'t want to live', 'jump off', 'hanging myself'
];

export function detectCrisis(text: string): boolean {
  const lowerText = text.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerText.includes(keyword));
}

export const CRISIS_RESPONSE = `I'm really concerned about what you're sharing. Please know that you're not alone, and there are people who want to support you. Since I am an AI, I cannot provide emergency services. Please reach out to one of these resources in Uganda immediately:

- **Mental Health Uganda (Toll-free):** 0800 21 21 21
- **Butabika National Referral Hospital:** +256 414 504388
- **Sauti Child Helpline:** 116

Please stay safe. You matter.`;

export async function saveMessage(sessionId: string, sender: 'user' | 'ai', content: string) {
  const { error } = await (supabase.from('chat_messages') as any)
    .insert({
      session_id: sessionId,
      sender,
      content,
    });

  if (error) {
    console.error('Error saving message:', error);
  }
}

export async function getChatHistory(sessionId: string): Promise<ChatMessage[]> {
  const { data, error } = await (supabase.from('chat_messages') as any)
    .select('sender, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }

  return (data || []).map((msg: any) => ({
    role: msg.sender === 'ai' ? 'ai' : 'user',
    content: msg.content,
  }));
}

export async function moderateContent(content: string): Promise<{ isSafe: boolean; reason?: string; suggestedAction: 'allow' | 'flag' | 'block' }> {
  try {
    const response = await fetch('/api/moderate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Moderation request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Moderation Error:', error);
    // Default to safe if API fails (to not block users), but log it
    return { isSafe: true, suggestedAction: 'allow' };
  }
}
