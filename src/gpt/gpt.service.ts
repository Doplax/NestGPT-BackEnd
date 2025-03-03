import { Injectable } from '@nestjs/common';
import { orthographyCheckUseCase, prosConsDicusserUseCase } from './use-cases/index';
import { OrthographyDto } from './dtos/ortography.dto';

import OpenAI from 'openai';

@Injectable()
export class GptService {
        
    private openai = new OpenAI({apiKey:process.env.OPEN_API_KEY});

    //Solo va a llamar casos de uso
    async orthographyCheck(prompt:string){
        return await orthographyCheckUseCase(this.openai,{prompt:prompt});
    }

    async prosConsDicusser(prompt:string){
        return await prosConsDicusserUseCase(this.openai,{prompt:prompt});
    }
}
