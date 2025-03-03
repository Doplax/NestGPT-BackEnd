import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, OrthographyDto  } from './dtos';
import { Response } from 'express';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(
    @Body() orthographyDto : OrthographyDto,
  ){
    return this.gptService.orthographyCheck(orthographyDto.prompt);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStrea(
    @Body() prosConsDiscusserDto : ProsConsDiscusserDto,
    @Res() res: Response
  ){
    const stream = await this.gptService.prosConsDicusserStream(prosConsDiscusserDto.prompt);

    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK );

    for await( const chunk of stream){
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }

    res.end();
  }
}
