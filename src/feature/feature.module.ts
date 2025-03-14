import { Module } from '@nestjs/common';
import { FeatureService } from './service/feature.service';
import { FeatureController } from './controller/feature.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FeatureController],
  providers: [FeatureService, PrismaService],
})
export class FeatureModule {}
