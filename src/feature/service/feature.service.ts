import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeatureDto } from '../dto/feature.dto';
import { UpdateFeatureDto } from '../dto/feature.dto';

@Injectable()
export class FeatureService {
  constructor(private prisma: PrismaService) {}

  async create(createFeatureDto: CreateFeatureDto) {
    return this.prisma.feature.create({
      data: createFeatureDto,
    });
  }

  async findAll() {
    return this.prisma.feature.findMany();
  }

  async findOne(id: number) {
    return this.prisma.feature.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateFeatureDto: UpdateFeatureDto) {
    return this.prisma.feature.update({
      where: { id },
      data: updateFeatureDto,
    });
  }

  async remove(id: number) {
    return this.prisma.feature.delete({
      where: { id },
    });
  }
}
