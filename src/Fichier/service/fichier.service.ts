import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFichierDto } from '../dto/fichier.dto';
import { UpdateFichierDto } from '../dto/fichier.dto';

@Injectable()
export class FichierService {
  constructor(private prisma: PrismaService) {}

  async create(createFichierDto: CreateFichierDto) {
    return this.prisma.fichier.create({
      data: createFichierDto,
    });
  }

  async findAll() {
    return this.prisma.fichier.findMany({
      include: { fichiersCours: true, ressources: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.fichier.findUnique({
      where: { id },
      include: { fichiersCours: true, ressources: true },
    });
  }

  async update(id: number, updateFichierDto: UpdateFichierDto) {
    return this.prisma.fichier.update({
      where: { id },
      data: updateFichierDto,
    });
  }

  async remove(id: number) {
    return this.prisma.fichier.delete({
      where: { id },
    });
  }
}
