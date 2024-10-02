import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GenerateContentUseCase } from './use-case/readwise-generator.use-case';
import { ReadwiseGeneratorRepository } from './repository/readwise-generator.repository';
import { CreateReadwiseGeneratorDto } from './dto/create-readwise-generator.dto';

@Injectable()
export class ReadwiseGeneratorService {
  constructor(
    private readonly generateContentUseCase: GenerateContentUseCase,
    private readonly repository: ReadwiseGeneratorRepository,
  ) {}

  @Cron('0 0 */5 * *') async handleCron() {
    console.log(`[${new Date().toISOString()}] Running content generation...`);
    try {
      await this.generateContentUseCase.execute();
      console.log('Daily content generation finished.');
    } catch (error) {
      console.error('Error during content generation:', error);
    }
  }

  async getAllGeneratedTexts() {
    return this.repository.findAll();
  }

  async findContentBySlug(slug: string) {
    const results = await this.findContentByDate();
    console.log({ results });
    const contentBySlug = results.filter((content) => content.slug === slug);
    return contentBySlug;
  }

  async findContentByDate(date?: string) {
    const today = new Date();
    console.log({ date });

    const startOfDay = new Date(date ? date : today);
    startOfDay.setHours(0, 0, 0, 0);
    startOfDay.setDate(startOfDay.getDate() - 5);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 6);

    console.log('Searching register from:', startOfDay, 'up to:', endOfDay);

    return this.repository.findByDateRange(startOfDay, endOfDay);
  }

  async saveContent(createReadwiseGeneratorDto: CreateReadwiseGeneratorDto) {
    return this.repository.saveContent(createReadwiseGeneratorDto);
  }
}
