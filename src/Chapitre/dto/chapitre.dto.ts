import { ApiProperty } from '@nestjs/swagger';

export class CreateChapitreDto {
  @ApiProperty({
    description: 'Titre du chapitre',
    type: String,
  })
  title: string;

  @ApiProperty({
    description: 'Description du chapitre (facultatif)',
    type: String,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: `ID de l'utilisateur`,
    type: Number,
  })
  userId: number;
}

export class UpdateChapitreDto {
  
  title?: string;
  description?: string;
  userId?: number;
}

