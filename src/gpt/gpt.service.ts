import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases/index';
import { OrthographyDto } from './dtos/ortography.dto';

import OpenAI from 'openai';
import { ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';

@Injectable()
export class GptService {
        
    private openai = new OpenAI({apiKey:process.env.OPEN_API_KEY});

    //Solo va a llamar casos de uso
    async orthographyCheck({prompt}:OrthographyDto){
        return await orthographyCheckUseCase(this.openai,{prompt});
    }

    async prosConsDicusser({prompt}:ProsConsDiscusserDto){
        return await prosConsDicusserUseCase(this.openai,{prompt});
    }

    async prosConsDicusserStream({prompt}: ProsConsDiscusserDto){
        return await prosConsDicusserStreamUseCase(this.openai,{prompt});
    }

    async translateText({prompt, lang} : TranslateDto){
        return await translateUseCase(this.openai, {prompt, lang});
    }

    async TextToAudio({prompt, voice}: TextToAudioDto){
        return await textToAudioUseCase(this.openai, {prompt, voice});
    }
}
