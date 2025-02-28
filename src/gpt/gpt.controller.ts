import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { OrthographyDto } from './dtos/ortography.dto';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('ortography-check')
  ortographyCheck(
    @Body() orthographyDto : OrthographyDto,
  ){
    return this.gptService.ortographyCheck({prompt: orthographyDto.prompt});
  }
}
