import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FeatureService } from '../service/feature.service';
import { CreateFeatureDto } from '../dto/feature.dto';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('feature') // Permet de regrouper les endpoints dans Swagger sous le tag 'feature'
@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les fonctionnalités' })
  @ApiResponse({
    status: 200,
    description: 'Retourne toutes les fonctionnalités',
  })
  findAll() {
    return this.featureService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer une nouvelle fonctionnalité' })
  @ApiResponse({
    status: 201,
    description: 'Fonctionnalité créée avec succès',
  })
  create(@Body() createFeatureDto: CreateFeatureDto) {
    return this.featureService.create(createFeatureDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Mettre à jour une fonctionnalité existante' })
  @ApiResponse({
    status: 200,
    description: 'Fonctionnalité mise à jour avec succès',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeatureDto: CreateFeatureDto,
  ) {
    return this.featureService.update(id, updateFeatureDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une fonctionnalité spécifique' })
  @ApiResponse({
    status: 200,
    description: "Retourne les détails d'une fonctionnalité",
  })
  @ApiResponse({
    status: 404,
    description: 'Fonctionnalité non trouvée',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.featureService.findOne(id);
  }

  @Get('remove/:id')
  @ApiOperation({ summary: 'Supprimer une fonctionnalité' })
  @ApiResponse({
    status: 200,
    description: 'Fonctionnalité supprimée avec succès',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.featureService.remove(id);
  }
}
