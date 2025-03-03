import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, OrthographyDto  } from './dtos';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(
    @Body() orthographyDto : OrthographyDto,
  ){
    return this.gptService.orthographyCheck(orthographyDto.prompt);
  }

  @Post('pros-cons-discusser')
  prosConsDicusser(
    @Body() prosConsDiscusserDto : ProsConsDiscusserDto,
  ){
    return this.gptService.prosConsDicusser(prosConsDiscusserDto.prompt);
  }
}
