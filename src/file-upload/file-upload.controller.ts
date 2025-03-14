import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { FileUploadService } from './file-upload.service';
import { UploadFileDto } from './UploadFile.dto';

@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  /**
   * Endpoint pour télécharger un fichier avec un nom d'utilisateur.
   * @param file Le fichier téléchargé via Multer.
   * @param uploadFileDto Le corps de la requête contenant le username.
   * @returns Un message de succès et le chemin du fichier.
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Intercepteur pour le fichier
  @ApiOperation({ summary: "Télécharge un fichier avec un nom d'utilisateur" })
  @ApiBody({
    description: "Fichier à télécharger et nom d'utilisateur",
    type: UploadFileDto, // Référence à votre DTO
  })
  @ApiResponse({
    status: 201,
    description: 'Fichier téléchargé avec succès',
    schema: {
      example: {
        message: 'File uploaded successfully',
        filePath: '/uploads/john_doe/filename.jpg',
      },
    },
  })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File, // Récupération du fichier téléchargé
    @Body() uploadFileDto: UploadFileDto, // Récupération des données du corps de la requête
  ) {
    // Vérification si le nom d'utilisateur est présent
    if (!uploadFileDto.userName) {
      throw new BadRequestException('Username is required');
    }

    // Appel à la méthode du service pour traiter le téléchargement
    return await this.fileUploadService.handleFileUpload(
      file,
      uploadFileDto.userName,
    );
  }
}
