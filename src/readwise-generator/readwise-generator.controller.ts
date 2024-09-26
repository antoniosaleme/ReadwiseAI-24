import { Controller, Get } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';

@Controller('generated-texts')
export class ReadwiseGeneratorController {
  constructor(private readonly generatorService: ReadwiseGeneratorService) {}

  @Get()
  async getAllGeneratedTexts() {
    return this.generatorService.getAllGeneratedTexts();
  }

  @Get('topics-by-date')
  async getGeneratedTextsByDate() {
    return this.generatorService.findContentByDate();
  }
}
