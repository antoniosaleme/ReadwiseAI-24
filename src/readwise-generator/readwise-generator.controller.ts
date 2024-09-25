import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';
import { CreateReadwiseGeneratorDto } from './dto/create-readwise-generator.dto';
import { UpdateReadwiseGeneratorDto } from './dto/update-readwise-generator.dto';

@Controller('readwise-generator')
export class ReadwiseGeneratorController {
  constructor(private readonly readwiseGeneratorService: ReadwiseGeneratorService) {}

  @Post()
  create(@Body() createReadwiseGeneratorDto: CreateReadwiseGeneratorDto) {
    return this.readwiseGeneratorService.create(createReadwiseGeneratorDto);
  }

  @Get()
  findAll() {
    return this.readwiseGeneratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readwiseGeneratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReadwiseGeneratorDto: UpdateReadwiseGeneratorDto) {
    return this.readwiseGeneratorService.update(+id, updateReadwiseGeneratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readwiseGeneratorService.remove(+id);
  }
}
