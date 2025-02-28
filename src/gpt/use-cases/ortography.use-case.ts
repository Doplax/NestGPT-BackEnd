import OpenAI from 'openai';
interface Options {
  prompt: string;
}

export const ortographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: "Tu nombre es pedro" },
      { role: 'user', content: prompt },
    ],
    store: true,
  });

  return completion.choices[0].message

  //return { prompt: prompt, apiKey: process.env.OPEN_API_KEY };
};
