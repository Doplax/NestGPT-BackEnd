import OpenAI from 'openai';
import { OrthographyDto, TextToAudioDto } from '../dtos/index';

export const textToAudioUseCase = async (
  openai: OpenAI,
  options: TextToAudioDto,
) => {

  const voices = {
    'nova': 'nova',
    'alloy': 'alloy',
  }

  const selctedVoice = voices[options.voice] ?? 'nova'; // En el caso de no ser uno de los dos, se selecciona nova por decefto


  //return completion.choices[0].message;
 
  return {
    prompt: prompt,
    selctedVoice: selctedVoice,
  };
};
