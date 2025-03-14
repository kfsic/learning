import { ApiProperty } from "@nestjs/swagger";

export class CreateRessourceDto {
  @ApiProperty({
    description: 'Titre de la ressource',
    type: String,
  })
  title: string;
  @ApiProperty({
    description: 'URL de la ressource',
    type: String,
  })
  url: string;
  @ApiProperty({
    description: 'ID du fichier associée',
    type: Number,
  })
  fichierId: number; // ID du fichier associé
}

export class UpdateRessourceDto {
  title?: string;
  url?: string;
  fichierId?: number;
}
