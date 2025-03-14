import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { StreamingService } from './streaming.service';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('stream')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get(':videoName')
  @ApiOperation({ summary: 'Stream video by name' })
  @ApiResponse({ status: 200, description: 'Streaming of video successful' })
  @ApiResponse({ status: 206, description: 'Partial content, streaming' })
  async streamVideo(
    @Param('videoName') videoName: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user = req.user; // Utilisateur extrait du token JWT
    const range = req.headers.range || 'bytes=0-';
    const { videoStream, headers } = await this.streamingService.getVideoChunk(
      videoName,
      user,
      range,
    );

    res.writeHead(206, headers); // En-tête HTTP pour indiquer un contenu partiel (206)
    videoStream.pipe(res); // Diffuse le morceau de vidéo au client
  }
}
