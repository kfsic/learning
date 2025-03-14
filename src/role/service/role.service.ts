import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateRoleDto } from '../dto/role.dto';
import { CreateRoleDto } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

    async create(createRoleDto: CreateRoleDto) {
   
    return this.prisma.role.create({
        data: createRoleDto ,
    });
  }

  async findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: number) {
    return this.prisma.role.delete({
      where: { id },
    });
  }
}
