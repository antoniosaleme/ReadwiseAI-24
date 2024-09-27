import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import { GenerateContentUseCase } from './use-case/readwise-generator.use-case';

const prisma = new PrismaClient();

@Injectable()
export class ReadwiseGeneratorService {
  constructor(
    private readonly generateContentUseCase: GenerateContentUseCase,
  ) {}

  @Cron('*/100 * * * *') async handleCron() {
    console.log(`[${new Date().toISOString()}] Running content generation...`);
    try {
      await this.generateContentUseCase.execute();
      console.log('Daily content generation finished.');
    } catch (error) {
      console.error('Error during content generation:', error);
    }
  }
  async getAllGeneratedTexts() {
    return prisma.generatedText.findMany();
  }

  async findContentByDate(date?: string) {
    const today = new Date();
    console.log({ date });

    const startOfDay = new Date(date ? date : today);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    console.log('date-segundo: ', date);
    console.log({ today });
    console.log('Buscando registros desde:', startOfDay, 'hasta:', endOfDay);

    return prisma.generatedText.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }

  async saveContent(
    topic: string,
    textB2: string,
    textC2: string,
    difficultWordsB2: { word: string; translation: string }[],
    difficultWordsC2: { word: string; translation: string }[],
    audioB2Url: string,
    audioC2Url: string,
    language: string,
  ) {
    return prisma.generatedText.create({
      data: {
        topic,
        levelB2: textB2,
        levelC2: textC2,
        difficultWordsB2,
        difficultWordsC2,
        audioB2Url,
        audioC2Url,
        language,
        date: new Date(),
      },
    });
  }
}
