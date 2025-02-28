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
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en el diccionario de la RAE,
        Debes de responder en formato JSON,
        tu tarea es corregirlos y retornar información de las solicitudes,
        tambien debes de dar un porcentaje de acierto por el usuario,
        
        Si no hay errores debes de retornar un mensaje de felicitaciones

        Ejemplo:
        {
          userScore:number,
          errors: string[], // ['error => solución']
          message: string // Usa emojis para dar feedback
        }
        `,
      },
      { role: 'user', content: prompt },
    ],
    store: true,
    max_tokens: 100,
    temperature: 0.3,
  });

  return completion.choices[0].message;

  //return { prompt: prompt, apiKey: process.env.OPEN_API_KEY };
};
