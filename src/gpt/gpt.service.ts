import { Injectable, NotFoundException } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserStreamUseCase, prosConsDicusserUseCase, textToAudioUseCase, translateUseCase } from './use-cases/index';
import { OrthographyDto } from './dtos/ortography.dto';

import OpenAI from 'openai';
import { ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';

import * as path from 'path';
import * as fs from 'fs';

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

    async textToAudio({prompt, voice}: TextToAudioDto){
        return await textToAudioUseCase(this.openai, {prompt, voice});
    }
 
    async textToAudioGetter(fileId: string){
        const filePath = path.resolve(__dirname, `../../generated/audios/${fileId}.mp3`);
        const wasFileFound = fs.existsSync(filePath);
        
        if(!wasFileFound){ new NotFoundException(`File ${fileId} not found`);}

        return filePath;
        //return await textToAudioUseCase(this.openai, {prompt, voice});
    }
}
