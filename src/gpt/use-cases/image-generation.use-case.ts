import OpenAI from 'openai';
import * as fs from 'fs';

interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (openai: OpenAI, options: Options) => {

  const { prompt, originalImage, maskImage } = options;
  

};
