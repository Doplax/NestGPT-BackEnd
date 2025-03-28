import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { donwloadImageAsPng, downloadBase64ImageAsPng } from '../helpers';
import { url } from 'inspector';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;

  const pngImageFullPath = await donwloadImageAsPng(baseImage, true);
  console.log(pngImageFullPath);

  const response = await openai.images.createVariation({
    model: 'dall-e-2',
    image: fs.createReadStream(pngImageFullPath),
    n:1,
    size: '1024x1024',
    response_format: 'url',
  });

  const fileName = await donwloadImageAsPng( response.data[0].url );
  const url = `${process.env.SERVER_URL}/gpt/image-generation/${fileName}`;

  console.log('tomate'); 
  return { 
    url: url,
    openAIUrl: response.data[0].url,
    revised_prompt: response.data[0].revised_prompt
  }
};
