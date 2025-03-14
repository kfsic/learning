import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { SectionService } from '../service/section.service';
import { CreateSectionDto } from '../dto/section.dto';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Get()
  findAll() {
    return this.sectionService.findAll();
  }
  @Post('create')
  create(@Body() createSectionDto: CreateSectionDto) {


    return this.sectionService.create(createSectionDto);
  }
  @Put('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSectionDto: CreateSectionDto,
  ) {
    return this.sectionService.update(id, updateSectionDto);
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.findOne(id);
  }
  @Get('remove/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sectionService.remove(id);
  }
}
