import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';

import { InternalServerErrorException } from "@nestjs/common";

export const donwloadImageAsPng = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Error downloading image');
  }


  const folderPath = path.resolve('./','./generated/images/');
  fs.mkdirSync(folderPath , { recursive: true }); // Create folder if not exists
 
  const imageNamePng = `${Date.now()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());

  //fs.writeFileSync( `${folderPath}/${imageNamePng}`, buffer);
  const completePath = path.join(folderPath, imageNamePng);

  await sharp(buffer)
    .png()
    .ensureAlpha()
    .toFile(completePath);

  return completePath;
}