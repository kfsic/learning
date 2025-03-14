import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SectionController } from './controller/section.controller';
import { SectionService } from './service/section.service';

@Module({
  controllers: [SectionController],
  providers: [SectionService, PrismaService],
})
export class sectionModule {}
