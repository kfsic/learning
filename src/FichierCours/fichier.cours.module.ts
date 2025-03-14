import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichierCoursController } from './controller/fichier.cours.controller';
import { FichierCoursService } from './service/fichierCours.service';

@Module({
  controllers: [FichierCoursController],
  providers: [FichierCoursService, PrismaService],
})
export class FichierCoursModule {}
