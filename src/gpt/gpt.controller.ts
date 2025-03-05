import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ProsConsDiscusserDto, OrthographyDto, TranslateDto, TextToAudioDto  } from './dtos';
import type { Response } from 'express';
import { prosConsDicusserUseCase } from './use-cases/pros-cons-dicusser.use-case';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('orthography-check')
  ortographyCheck(
    @Body() orthographyDto : OrthographyDto,
  ){
    return this.gptService.orthographyCheck(orthographyDto);
  }

  @Post('pros-cons-discusser')
  async prosConsDicusserUseCase(
    @Body() prosConsDiscusserDto : ProsConsDiscusserDto,
  ){
    return this.gptService.prosConsDicusser(prosConsDiscusserDto);
  }

  @Post('pros-cons-discusser-stream')
  async prosConsDicusserStream(
    @Body() prosConsDiscusserDto : ProsConsDiscusserDto,
    @Res() res: Response
  ){
    const stream = await this.gptService.prosConsDicusserStream(prosConsDiscusserDto);

    res.setHeader('Content-Type', 'application/json');
    res.status( HttpStatus.OK );

    for await( const chunk of stream){
      const piece = chunk.choices[0].delta.content || '';
      console.log(piece);
      res.write(piece);
    }
    res.end();
  }

  // TODO: Create Stream Translation
  @Post('translate')
  translateText(
    @Body() translateDto : TranslateDto,
  ){
    return this.gptService.translateText(translateDto);
  }

  @Post('text-to-audio')
  async textToAudio(
    @Body() textToAudioDto : TextToAudioDto,
    @Res() res: Response
  ){
    const filePath = await this.gptService.textToAudio(textToAudioDto);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status( HttpStatus.OK );
    res.sendFile(filePath);
  }

  @Get('text-to-audio/:fileId')
  async getTextToAudio(
    @Param('fileId') fileId : string,
    @Res() res: Response
  ){
    const filePath = await this.gptService.textToAudioGetter(fileId);
    res.setHeader('Content-Type', 'audio/mp3');
    res.status( HttpStatus.OK );
    res.sendFile(filePath);

  }
}
