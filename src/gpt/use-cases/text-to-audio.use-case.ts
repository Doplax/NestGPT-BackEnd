import OpenAI from 'openai';
import { OrthographyDto, TextToAudioDto } from '../dtos/index';
import * as path from 'path';
import * as fs from 'fs';

export const textToAudioUseCase = async (
  openai: OpenAI,
  options: TextToAudioDto,
) => {
  const voices = {
    nova: 'nova',
    alloy: 'alloy',
    ash: 'ash',
    coral: 'coral',
    echo: 'echo',
    fable: 'fable',
    onyx: 'onyx',
    sage: 'sage',
    shimmer: 'shimmer',
  };

  const selctedVoice = voices[options.voice] ?? 'nova'; // En el caso de no ser uno de los dos, se selecciona nova por decefto

  const folderPath = path.resolve(__dirname, `../../../generated/audios`);
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true }); // Crea la carpeta si no existe

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selctedVoice,
    input: options.prompt,
    response_format: 'mp3'
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile
};
