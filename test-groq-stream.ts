import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

async function test() {
  try {
    console.log('Testing Groq stream with model llama-3.1-8b-instant...');
    const result = await streamText({
      model: groq('llama-3.1-8b-instant'),
      prompt: 'Hello, are you there?',
    });
    
    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
    console.log('\nSuccess!');
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

test();
