import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

async function test() {
  try {
    console.log('Testing Groq with model llama3-8b-8192...');
    const { text } = await generateText({
      model: groq('llama3-8b-8192'),
      prompt: 'Hello, are you there?',
    });
    console.log('Response:', text);
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

test();
