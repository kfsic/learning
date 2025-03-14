import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChapitreDto } from '../dto/chapitre.dto';
import { UpdateChapitreDto } from '../dto/chapitre.dto';

@Injectable()
export class ChapitreService {
  constructor(private prisma: PrismaService) {}

  async create(createChapitreDto: CreateChapitreDto) {
    return this.prisma.chapitre.create({
      data: createChapitreDto,
    });
  }

  async findAll() {
    return this.prisma.chapitre.findMany({
      include: { sections: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.chapitre.findUnique({
      where: { id },
      include: {
        sections: {
          include: {
            fichiersCours: {
              include: {
                fichier: {
                  include: {   ressources: true,},
                }, // Inclure les fichiers associés à chaque FichierCours
              },
            },
          },
        },
      },
    });
  }

  async update(id: number, updateChapitreDto: UpdateChapitreDto) {
    return this.prisma.chapitre.update({
      where: { id },
      data: updateChapitreDto,
    });
  }

  async remove(id: number) {
    return this.prisma.chapitre.delete({
      where: { id },
    });
  }
}
