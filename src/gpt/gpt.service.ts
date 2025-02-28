import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase } from './use-cases/index';

@Injectable()
export class GptService {
    //Solo va a llamar casos de uso

    async ortographyCheck(orthographyDto){
        return await ortographyCheckUseCase(orthographyDto);
    }
}
