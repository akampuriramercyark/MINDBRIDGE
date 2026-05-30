import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const SYSTEM_PROMPT = `You are an AI wellness expert for MindBridge, a platform for Ugandan and African youth. 
Generate 50 short, powerful, and culturally resonant affirmations. 
Focus on themes like resilience, overcoming "black tax" pressures, academic success, self-love, and community support. 
Use Gen Z friendly but respectful language. Occasional local greetings like "Mirembe" or "Webale" are encouraged.
Return the result as a JSON array of strings.`;

async function main() {
  // This is a placeholder for the actual generation logic if an API key was available.
  // Since I don't have the key in the environment right now, I will provide a static list 
  // of high-quality examples that fit the criteria.
  
  const affirmations = [
    "You are doing enough, even when the world asks for more. #MindBridge",
    "Your worth is not defined by your 'black tax' or family expectations. You matter.",
    "Mirembe. Peace starts with how you talk to yourself today.",
    "Small steps lead to big change. Keep pushing, you've got this.",
    "It's okay to prioritize your mental health. You can't pour from an empty cup.",
    "You are resilient, like the mountains of Uganda. Unshakable.",
    "Webale for showing up today. That in itself is a victory.",
    "Your dreams are valid, regardless of the economy or job market.",
    "Identity is a journey, not a destination. You are allowed to grow.",
    "Brave is not the absence of fear, but moving forward despite it.",
    "You are the architect of your own joy. Build something beautiful today.",
    "Loneliness is temporary; your inner strength is forever.",
    "You are seen. You are heard. You are supported. #SanyuAI",
    "Rest is not a reward; it is a necessity. Give yourself permission to pause.",
    "Comparison is the thief of joy. Your path is unique and beautiful.",
    "You are capable of handling whatever this week throws at you.",
    "Your voice has power. Speak your truth with kindness and courage.",
    "Progress over perfection. Every small win counts.",
    "You are a light in your community. Let yourself shine.",
    "Osiibye otya? Regardless of how your day was, tomorrow is a new beginning."
  ];

  console.log(JSON.stringify(affirmations, null, 2));
}

main();
