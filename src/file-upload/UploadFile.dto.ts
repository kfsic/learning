import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    description: "Nom d'utilisateur",
    type: String,
    example: 'john_doe',
  })
  userName: string;

  @ApiProperty({
    description: 'Fichier à télécharger',
    type: File,
    format: 'binary',
  })
  file: any; // 'any' ici car le fichier sera un objet `Express.Multer.File`
}
