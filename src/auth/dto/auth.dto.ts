import { ApiProperty } from '@nestjs/swagger';
import {  IsInt, IsNotEmpty, IsString, Min,  } from 'class-validator';
export class AuthPayloadDto {
  @ApiProperty({
    description: "Nom d'utilisateur",
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'securePassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserDto {
  @ApiProperty({
    description: "Nom d'utilisateur unique",
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur (doit être sécurisé)",
    example: 'securePassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: "Nom complet de l'utilisateur",
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: "Genre de l'utilisateur",
    example: 'homme',
    enum: ['homme', 'femme', 'autre'],
  })
  @IsNotEmpty()
  @IsString()
  sexe: string;

  @ApiProperty({
    description: "Date de naissance de l'utilisateur",
    example: '1990-05-15T00:00:00.000Z',
    type: String, // Swagger gère mieux les dates sous forme de chaînes
    format: 'String',
  })
  @IsNotEmpty()
  dateNais: string;

  @ApiProperty({
    description: "ID du rôle associé à l'utilisateur",
    example: 1,
  })
 @IsInt() // Validation pour s'assurer que roleId est un entier
  @Min(1)
  roleId: number;
}

export class UpdateUserDto {
  @ApiProperty({
    description: "Nom d'utilisateur unique (facultatif)",
    example: 'john_doe',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur (facultatif)",
    example: 'securePassword123',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  password?: string;

  @ApiProperty({
    description: "Nom complet de l'utilisateur (facultatif)",
    example: 'John Doe',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    description: "Genre de l'utilisateur (facultatif)",
    example: 'homme',
    enum: ['homme', 'femme', 'autre'],
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  sexe?: string;

  @ApiProperty({
    description: "Date de naissance de l'utilisateur (facultatif)",
    example: '1990-05-15T00:00:00.000Z',
    type: String,
    format: 'String',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  dateNais?: string;

  @ApiProperty({
    description: "ID du rôle associé à l'utilisateur (facultatif)",
    example: 1,
    required: false,
  })
  @IsInt() // Validation pour s'assurer que roleId est un entier
 @Min(1)
  roleId?: number;
}


