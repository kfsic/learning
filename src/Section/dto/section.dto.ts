import { ApiProperty } from "@nestjs/swagger";

export class CreateSectionDto {
   @ApiProperty({
        description: 'Titre de la section',
        type: String,
      })
   title: string;
   @ApiProperty({
        description: 'ID du chapitre parent',
        type: Number,
      })
  chapitreId: number; // ID du chapitre parent
   @ApiProperty({
        description: 'Ordre de la section',
        type: Number,
      })
  rang: number;
}

export class UpdateSectionDto {
  title?: string;
  chapitreId?: number;
  range?: number;
}
