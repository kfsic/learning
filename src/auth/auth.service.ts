import { Injectable } from '@nestjs/common';
import { AuthPayloadDto, CreateUserDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';


const fakeUsers = [
  {
    id: 1,
    username: 'anson',
    password: 'password',
  },
  {
    id: 2,
    username: 'jack',
    password: 'password123',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = this.prisma.user.findUnique({ where: { username } });

    return findUser.then((user) => {
      if (!user) {
        return null;
      }
      if (user.password === password) {
        const token = this.jwtService.sign(user);
        return { ...user, token };
      }
      return null;
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    const username = createUserDto.username;
   
    // Vérification si l'utilisateur existe déjà
    const findUser = await this.prisma.user.findUnique({
      where: { username },
    });

    if (findUser) {
      console.log('User name already exists', findUser);
      return {
        message: 'User name already exists',
      };
    }

    // Création de l'utilisateur
    return this.prisma.user.create({
      data: createUserDto,
    });
  }
  async getUsers() {
    return await this.prisma.user.findMany();
  }
  async getUser(id: number) {
    if (!id) {
      throw new Error('ID is required'); // Ou utilisez une exception HTTP appropriée
    }

    const user = this.prisma.user.findUnique({
      where: { id }, // Assurez-vous que 'id' est défini et valide
    });

    if (!user) {
      throw new Error('User not found'); // Ou utilisez une exception HTTP appropriée
    }
    return user;
  }
}
