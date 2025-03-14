import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRessourceDto } from '../dto/ressource.dto';
import { UpdateRessourceDto } from '../dto/ressource.dto';

@Injectable()
export class RessourceService {
  constructor(private prisma: PrismaService) {}

  async create(createRessourceDto: CreateRessourceDto) {
    return this.prisma.ressource.create({
      data: createRessourceDto,
    });
  }

  async findAll() {
    return this.prisma.ressource.findMany({
      include: { fichier: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.ressource.findUnique({
      where: { id },
      include: { fichier: true },
    });
  }

  async update(id: number, updateRessourceDto: UpdateRessourceDto) {
    return this.prisma.ressource.update({
      where: { id },
      data: updateRessourceDto,
    });
  }

  async remove(id: number) {
    return this.prisma.ressource.delete({
      where: { id },
    });
  }
}
