import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateRessourceDto } from '../dto/ressource.dto';
import { RessourceService } from '../service/ressource.service';

@Controller('ressource')
export class RessourceController {
  constructor(private ressourceService: RessourceService) {}

  @Get()
  findAll() {
    return this.ressourceService.findAll();
  }

  @Post('create')
  create(@Body() createRessourceDto: CreateRessourceDto) {
    return this.ressourceService.create(createRessourceDto);
  }

  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRessourceDto: CreateRessourceDto, // Renommé pour plus de clarté
  ) {
    return this.ressourceService.update(id, updateRessourceDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ressourceService.findOne(id);
  }

  @Delete('remove/:id') // Changer le `@Get` en `@Delete` pour respecter les conventions REST
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ressourceService.remove(id);
  }
}
