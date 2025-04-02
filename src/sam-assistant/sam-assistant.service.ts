import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { createThreadUseCase } from './use-cases/create-thread.use-case';

@Injectable()
export class SamAssistantService {

    private openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });


    async createThread() {
        return await createThreadUseCase(this.openai)
    }
    
    userQuestion(questionDto) {
        return questionDto;
    }
}
