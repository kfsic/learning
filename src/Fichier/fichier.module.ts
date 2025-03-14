import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FichierService } from './service/fichier.service';
import { FichierController } from './controller/fichier.controller';

@Module({
  controllers: [FichierController],
  providers: [FichierService, PrismaService],
})
export class FichierModule {}
