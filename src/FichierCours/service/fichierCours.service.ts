import { Injectable } from '@nestjs/common';
import {
  CreateFichierCoursDto,
  UpdateFichierCoursDto,
} from '../dto/fichierCours.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FichierCoursService {
  constructor(private prisma: PrismaService) {}

  async create(createFichierCoursDto: CreateFichierCoursDto) {
    return this.prisma.fichierCours.create({
      data: createFichierCoursDto,
    });
  }

  async findAll() {
    return this.prisma.fichierCours.findMany({
      include: { fichier: true, section: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.fichierCours.findUnique({
      where: { id },
      include: { fichier: true, section: true },
    });
  }

  async update(id: number, updateFichierCoursDto: UpdateFichierCoursDto) {
    return this.prisma.fichierCours.update({
      where: { id },
      data: updateFichierCoursDto,
    });
  }

  async remove(id: number) {
    return this.prisma.fichierCours.delete({
      where: { id },
    });
  }
}
