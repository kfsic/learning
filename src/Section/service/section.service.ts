import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto } from '../dto/section.dto';
import { UpdateSectionDto } from '../dto/section.dto';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async create(createSectionDto: CreateSectionDto) {
    return this.prisma.section.create({
      data: createSectionDto,
    });
  }

  async findAll() {
    return this.prisma.section.findMany({
      include: { chapitre: true, fichiersCours: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.section.findUnique({
      where: { id },
      include: { chapitre: true, fichiersCours: true },
    });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    return this.prisma.section.update({
      where: { id },
      data: updateSectionDto,
    });
  }

  async remove(id: number) {
    return this.prisma.section.delete({
      where: { id },
    });
  }
}
