import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FichierCoursService } from '../service/fichierCours.service';
import { CreateFichierCoursDto } from '../dto/fichierCours.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('fichier/cours') // Regroupe les routes sous un tag 'fichier/cours' dans Swagger
@Controller('fichier/cours')
export class FichierCoursController {
  constructor(private fichierCoursService: FichierCoursService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les fichiers de cours' })
  @ApiResponse({
    status: 200,
    description: 'Retourne tous les fichiers de cours',
  })
  findAll() {
    return this.fichierCoursService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer un fichier de cours' })
  @ApiResponse({
    status: 201,
    description: 'Fichier de cours créé avec succès',
  })
  create(@Body() createFichierCoursDto: CreateFichierCoursDto) {
    return this.fichierCoursService.create(createFichierCoursDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Mettre à jour un fichier de cours' })
  @ApiResponse({
    status: 200,
    description: 'Fichier de cours mis à jour avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Fichier de cours non trouvé',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFichierCoursDto: CreateFichierCoursDto,
  ) {
    return this.fichierCoursService.update(id, updateFichierCoursDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un fichier de cours spécifique' })
  @ApiResponse({
    status: 200,
    description: "Retourne les détails d'un fichier de cours",
  })
  @ApiResponse({
    status: 404,
    description: 'Fichier de cours non trouvé',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fichierCoursService.findOne(id);
  }

  @Get('remove/:id')
  @ApiOperation({ summary: 'Supprimer un fichier de cours' })
  @ApiResponse({
    status: 200,
    description: 'Fichier de cours supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Fichier de cours non trouvé',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fichierCoursService.remove(id);
  }
}
