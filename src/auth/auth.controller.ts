import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthPayloadDto, CreateUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Authentication') // Ajoute une catégorie dans Swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Connexion de l’utilisateur',
    description: 'Authentifie un utilisateur et retourne un token JWT.',
  })
  @ApiBody({
    type: AuthPayloadDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        username: 'john_doe',
      },
    },
  })
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @ApiOperation({
    summary: 'Vérifie l’état de l’utilisateur connecté',
    description: 'Renvoie les informations de l’utilisateur authentifié.',
  })
  @ApiBearerAuth() // Indique que ce endpoint nécessite un token JWT
  @ApiResponse({
    status: 200,
    description: 'Informations de l’utilisateur connecté.',
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        role: 'admin',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    console.log(req.user);
    return req.user;
  }

  @Post('/create-user')
  @ApiOperation({
    summary: 'Créer un nouvel utilisateur',
    description: 'Ajoute un utilisateur à la base de données.',
  })
  @ApiResponse({
    status: 201,
    description: 'Utilisateur créé avec succès.',
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        name: 'John Doe poncy',
        sexe: 'homme',
        dateNais: '1990-05-15',
        roleId: 1,
      },
    },
  })
  @Redirect('/auth/login')
  @Redirect('/auth/create-user', 2)
  async createUser(@Body() createUserDto: any) {
    console.log('je suis la donne', createUserDto);
    const roleId = createUserDto.roleId;
    // Conversion explicite de roleId en nombre entier
    createUserDto.roleId = parseInt(roleId as any, 10);

    // Vérification si roleId est un nombre valide
    if (isNaN(createUserDto.roleId)) {
      throw new Error('roleId doit être un nombre valide');
    }

    // Appel du service avec les données converties
    const user = this.authService.createUser(createUserDto);

    return user;
  }

  @Get('/get-all')
  @ApiOperation({
    summary: 'Récupère tous les utilisateurs',
    description: 'Renvoie la liste de tous les utilisateurs enregistrés.',
  })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs.',
    schema: {
      example: [
        {
          id: 1,
          username: 'john_doe',
          name: 'John Doe',
          sexe: 'homme',
          dateNais: '1990-05-15',
          roleId: 1,
        },
        {
          id: 2,
          username: 'jane_doe',
          name: 'Jane Doe',
          sexe: 'femme',
          dateNais: '1992-10-20',
          roleId: 2,
        },
      ],
    },
  })
  getAll() {
    return this.authService.getUsers();
  }

  @Get('/get-one/:id')
  @ApiOperation({
    summary: 'Récupère un utilisateur spécifique',
    description: 'Renvoie les informations d’un utilisateur par son ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Informations de l’utilisateur.',
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        name: 'John Doe',
        sexe: 'homme',
        dateNais: '1990-05-15',
        roleId: 1,
      },
    },
  })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUser(id);
  }

  @Get('create-user')
  @Render('user/create-user')
  asynccreateUser() {
    return {};
  }

  @Get('login')
  @Render('user/login')
  async loginGEt() {
    return {};
  }
}
