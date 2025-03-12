import OpenAI from 'openai';
import * as fs from 'fs';
import { donwloadImageAsPng } from '../helpers';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}


export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {

  const { prompt, originalImage, maskImage } = options;
  
  // Todo: Verificar original image
  const response = await openai.images.generate({
    prompt: prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',

  });

  donwloadImageAsPng('https://oaidalleapiprodscus.blob.core.windows.net/private/org-wib0f3HHqIWxIUKcNH07WzsV/user-pqrZ5dioFEpSJZybFfgwcm4i/img-kTarNyutiYMDblM9mn1mW9ki.png?st=2025-03-12T13%3A12%3A51Z&se=2025-03-12T15%3A12%3A51Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-11T23%3A16%3A45Z&ske=2025-03-12T23%3A16%3A45Z&sks=b&skv=2024-08-04&sig=zLO3kPzHU9q/7wSD7pRqn%2Bfwct5O3//0irN1PtU43d0%3D');
 
  return {
    url: response.data[0].url,
    localPath: '',
    revised_prompt: response.data[0].revised_prompt,
  }
};
