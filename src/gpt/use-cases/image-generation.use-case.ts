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

  const url = await donwloadImageAsPng(response.data[0].url);
 


  return {
    url: url,
    openAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt,
  }
};
