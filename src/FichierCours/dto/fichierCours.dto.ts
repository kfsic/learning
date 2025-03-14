import { ApiProperty } from "@nestjs/swagger";

export class CreateFichierCoursDto {
  @ApiProperty({
    description: 'ID du fichier',
    type: Number,
  })
  fichierId: number; // ID du fichier
  @ApiProperty({
    description: 'ID de la section',
    type: Number,
  })
  sectionId: number; // ID de la section
}

export class UpdateFichierCoursDto {
  fichierId?: number;
  sectionId?: number;
}
