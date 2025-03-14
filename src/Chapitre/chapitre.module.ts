import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChapitreController } from './controller/chapitre.controller';
import { ChapitreService } from './service/chapitre.service';

@Module({
  controllers: [ChapitreController],
  providers: [ChapitreService, PrismaService],
})
export class ChapitreModule {}
