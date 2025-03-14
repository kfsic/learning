import { Module } from '@nestjs/common';
import { PermissionService } from './services/permission.service';
import { PermissionController } from './controller/permission.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, PrismaService],
})
export class PermissionModule {}
