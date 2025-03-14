import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePermissionDto } from '../dto/permission.dto';
import { UpdatePermissionDto } from '../dto/permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    return this.prisma.permission.create({
      data: createPermissionDto,
    });
  }

  async findAll() {
    return this.prisma.permission.findMany({
      include: { role: true, feature: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.permission.findUnique({
      where: { id },
      include: { role: true, feature: true },
    });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return this.prisma.permission.update({
      where: { id },
      data: updatePermissionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.permission.delete({
      where: { id },
    });
  }
}
