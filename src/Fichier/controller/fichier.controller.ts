import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FichierService } from '../service/fichier.service';
import { CreateFichierDto } from '../dto/fichier.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('fichier') // Regroupe les routes sous un tag 'fichier' dans Swagger
@Controller('fichier')
export class FichierController {
  constructor(private fichierService: FichierService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les fichiers' })
  @ApiResponse({
    status: 200,
    description: 'Retourne tous les fichiers',
  })
  findAll() {
    return this.fichierService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer un nouveau fichier' })
  @ApiResponse({
    status: 201,
    description: 'Fichier créé avec succès',
  })
  create(@Body() createFichierDto: CreateFichierDto) {
    return this.fichierService.create(createFichierDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Mettre à jour un fichier existant' })
  @ApiResponse({
    status: 200,
    description: 'Fichier mis à jour avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Fichier non trouvé',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFichierServiceDto: CreateFichierDto,
  ) {
    return this.fichierService.update(id, updateFichierServiceDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un fichier spécifique' })
  @ApiResponse({
    status: 200,
    description: 'Retourne les détails du fichier',
  })
  @ApiResponse({
    status: 404,
    description: 'Fichier non trouvé',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fichierService.findOne(id);
  }

  @Get('remove/:id')
  @ApiOperation({ summary: 'Supprimer un fichier' })
  @ApiResponse({
    status: 200,
    description: 'Fichier supprimé avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Fichier non trouvé',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fichierService.remove(id);
  }
}
