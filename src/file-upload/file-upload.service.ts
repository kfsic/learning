import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import { writeFile, mkdirSync, existsSync } from 'fs';

@Injectable()
export class FileUploadService {
  private readonly uploadDir = './uploads';

  constructor() {
    this.ensureUploadDirectory();
  }

  /**
   * Gère l'importation et la validation d'un fichier.
   * @param file Le fichier téléchargé.
   * @param userName Le nom d'utilisateur à inclure dans le nom du fichier.
   * @returns Un message de succès avec le chemin du fichier.
   */
  async handleFileUpload(
    file: Express.Multer.File,
    userName: string,
  ): Promise<{ message: string; filePath: string }> {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Validation des types MIME
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'video/mp4',
    ];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(`Invalid file type: ${file.mimetype}`);
    }

    // Valider la taille du fichier
    const maxSize = 50 * 1024 * 1024; // 50 MB
    if (file.size > maxSize) {
      throw new BadRequestException('File is too large!');
    }
    const uploadDire = this.uploadDir + '/image';

    // Générer un nom de fichier unique avec le username
    const uniqueFileName = `${Date.now()}-${userName}-${file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;
    const filePath = `${this.uploadDir}/${uniqueFileName}`;
    const filePath2 = uniqueFileName;

    // Enregistrer le fichier sur le disque
    await this.saveFile(file, filePath);

    return {
      message: 'File uploaded successfully',
      filePath: filePath2,
    };
  }

  /**
   * Enregistre le fichier sur le disque.
   * @param file Le fichier téléchargé.
   * @param filePath Chemin cible du fichier.
   */
  private async saveFile(
    file: Express.Multer.File,
    filePath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      writeFile(filePath, file.buffer, (err) => {
        if (err) {
          reject(new BadRequestException('Error saving file'));
        }
        resolve();
      });
    });
  }

  /**
   * Vérifie que le répertoire des téléchargements existe ou le crée.
   */
  private ensureUploadDirectory(): void {
    if (!existsSync(this.uploadDir)) {
      mkdirSync(this.uploadDir, { recursive: true });
    }
  }
}
