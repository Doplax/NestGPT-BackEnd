import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { donwloadImageAsPng, downloadBase64ImageAsPng } from '../helpers';

interface Options {
  baseImage: string;
}

export const imageVariationUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { baseImage } = options;
  console.log(baseImage);
};
