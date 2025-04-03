import { Injectable } from '@nestjs/common';

import OpenAI from 'openai';
import { createThreadUseCase } from './use-cases/create-thread.use-case';
import { QuestionDto } from './dtos/question.dto';
import { createMessageUseCase, createRunUseCase } from './use-cases';

@Injectable()
export class SamAssistantService {

    private openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });

    
    async createThread() {
        return await createThreadUseCase(this.openai)
    }
    
    async userQuestion(questionDto: QuestionDto) {
        const { threadId ,question } = questionDto;
        const message = await createMessageUseCase(this.openai, {
            threadId: threadId,
            questions: question,
        })

        const run = await createRunUseCase(this.openai,{threadId})

        return questionDto;
    }
}
