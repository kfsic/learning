import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ChapitreService } from '../service/chapitre.service';
import { CreateChapitreDto } from '../dto/chapitre.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('chapitre') // Permet de regrouper les endpoints dans Swagger sous le tag 'chapitre'
@Controller('chapitre')
export class ChapitreController {
  constructor(private chapitreService: ChapitreService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir tous les chapitres' })
  @ApiResponse({
    status: 200,
    description: 'Retourne tous les chapitres',
  })
  findAll() {
    return this.chapitreService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer un nouveau chapitre' })
  @ApiResponse({
    status: 201,
    description: 'Chapitre créé avec succès',
  })
  create(@Body() createChapitreDto: CreateChapitreDto) {
    return this.chapitreService.create(createChapitreDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Mettre à jour un chapitre existant' })
  @ApiResponse({
    status: 200,
    description: 'Chapitre mis à jour avec succès',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChapitreDto: CreateChapitreDto,
  ) {
    return this.chapitreService.update(id, updateChapitreDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un chapitre spécifique' })
  @ApiResponse({
    status: 200,
    description: "Retourne les détails d'un chapitre",
  })
  @ApiResponse({
    status: 404,
    description: 'Chapitre non trouvé',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.chapitreService.findOne(id);
  }

  @Get('remove/:id')
  @ApiOperation({ summary: 'Supprimer un chapitre' })
  @ApiResponse({
    status: 200,
    description: 'Chapitre supprimé avec succès',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.chapitreService.remove(id);
  }
}
