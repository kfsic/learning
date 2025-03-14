import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/permission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('permissions') // Tag pour regrouper les routes de permissions
@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les permissions' })
  @ApiResponse({
    status: 200,
    description: 'Liste des permissions',
  })
  findAll() {
    return this.permissionService.findAll();
  }

  @Post('create')
  @ApiOperation({ summary: 'Créer une nouvelle permission' })
  @ApiBody({ type: CreatePermissionDto })
  @ApiResponse({
    status: 201,
    description: 'Permission créée avec succès',
  })
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Mettre à jour une permission existante' })
  @ApiResponse({
    status: 200,
    description: 'Permission mise à jour avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Permission non trouvée',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermissionDto: CreatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une permission par ID' })
  @ApiResponse({
    status: 200,
    description: 'Détails de la permission',
  })
  @ApiResponse({
    status: 404,
    description: 'Permission non trouvée',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.findOne(id);
  }

  @Get('remove/:id')
  @ApiOperation({ summary: 'Supprimer une permission par ID' })
  @ApiResponse({
    status: 200,
    description: 'Permission supprimée avec succès',
  })
  @ApiResponse({
    status: 404,
    description: 'Permission non trouvée',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.permissionService.remove(id);
  }
}
