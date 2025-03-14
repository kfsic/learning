import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RessourceService } from './service/ressource.service';
import { RessourceController } from './controller/ressource.controller';

@Module({
  controllers: [RessourceController],
  providers: [RessourceService, PrismaService],
})
export class RessourceModule {}
