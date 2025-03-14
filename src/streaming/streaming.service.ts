

import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';

@Injectable()
export class StreamingService {
  private readonly uploadsDirectory = join(__dirname, '..', '..', 'uploads');

  // Récupérer un morceau spécifique d'une vidéo
  async getVideoChunk(videoName: string, user: any, range: string) {
    const video = await this.findVideoByName(videoName); // Trouver la vidéo dans la base de données
    if (!video) {
      throw new NotFoundException(`Video not found: ${videoName}`);
    }


    const videoPath = join(this.uploadsDirectory, video.filePath);
    const videoSize = statSync(videoPath).size;

    // Si un "range" est donné (par exemple, un morceau spécifique de vidéo)
    const CHUNK_SIZE = 10 ** 6; // 1 Mo par morceau
    const start = range ? Number(range.replace(/\D/g, '')) : 0;
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

    const videoStream = createReadStream(videoPath, { start, end });
    const contentLength = end - start + 1;

    return {
      videoStream,
      headers: {
        'Content-Range': `bytes ${start}-${end}/${videoSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': contentLength,
        'Content-Type': 'video/mp4',
      },
    };
  }

  // Trouver une vidéo dans la base de données (à implémenter selon votre modèle)
  private async findVideoByName(videoName: string) {
    // Implémentez la recherche dans la base de données ici
    return {
      filePath: `${videoName}`,
      ownerId: 1,
      // Ceci est juste un exemple, ajustez selon vos besoins
    };
  }
}
