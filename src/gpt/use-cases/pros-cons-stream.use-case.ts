import OpenAI from 'openai';
import { ProsConsDiscusserDto } from '../dtos';

export const prosConsDicusserStreamUseCase = async (
  openai: OpenAI,
  {prompt}: ProsConsDiscusserDto,
) => {

  // Devolvemos 
  return await openai.chat.completions.create({
    stream: true, //<- Diferencia con el caso de uso anterior 
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
        Se te dará una pregunta y tu tarea es dar una respuesta con PROS y Contras,
        La respuesta debe de ser en formato markdown,
        los pros y contras deben de estar en una lista,
        `,
      },
      { role: 'user', content: prompt },
    ],
    store: true,
    max_tokens: 500,
    temperature: 0.8,
  });
};
