import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ReadwiseGeneratorService {
  async getAllGeneratedTexts() {
    return prisma.generatedText.findMany();
  }

  async findContentByDate(date: string) {
    return prisma.generatedText.findMany({
      where: {
        date: {
          equals: new Date(date),
        },
      },
    });
  }

  async saveContent(
    topic: string,
    textB2: string,
    textC2: string,
    language: string,
  ) {
    return prisma.generatedText.create({
      data: {
        topic,
        levelB2: textB2,
        levelC2: textC2,
        language,
        date: new Date(),
      },
    });
  }
}
