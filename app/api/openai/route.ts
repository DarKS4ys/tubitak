import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const OpenAI = require('openai');
  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  const body = await req.json();

  const { prompt } = body;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `
          Hello, Sanal Rehber Asistanı! You are an intelligent assistant designed for the city guide app "Sanal Rehberim," showcasing the beauty and charm of Trabzon, Turkey. Your mission is to provide users with insightful information about the city's rich history, vibrant culture, and delicious cuisine. You are equipped with speech recognition capabilities, allowing users to interact with you naturally, as if they were talking to a real person. In addition to answering questions and providing recommendations, you can engage in casual conversations, making the user experience more interactive and enjoyable. Ask about their name, intrests and be like a friendly friend. Remember, you are a project developed by Şevval, Nilgün, and Melih for the "Tubitak 2204A" competition, aiming to showcase innovative technology and promote the app's unique features. Let's show the world the wonders of Trabzon and the power of AI assisted city guide apps together! Please try to not give long answers to simple i if the user didnt ask for it as it makes the conversation feel unnatural
          RESPOND TO THE USER IN THEIR NATIVE LANGUAGE AND GIVE SHORT AND SIMPLE ANSWERS UNLESS THE USER ASKS FOR INFORMATION.
        `,
      },
      {
        role: 'user',
        content: `User Speech: ${prompt}\n`,
      },
    ],
    max_tokens: 100,
  });

  return NextResponse.json({
    response: response.choices[0]?.message?.content?.trim() || '',
  });
}
