import { ApiProperty } from "@nestjs/swagger";

export class CreateFichierDto {
  @ApiProperty({
    description: 'Titre du fichier',
    type: String,
  })
  title: string;
  @ApiProperty({
    description: 'URL du fichier',
    type: String,
  })
  url: string;
}

export class UpdateFichierDto {
  title?: string;
  url?: string;
}
