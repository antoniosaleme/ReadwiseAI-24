import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ReadwiseGeneratorService {
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
    audioB2: Buffer,
    audioC2: Buffer,
    language: string,
  ) {
    return prisma.generatedText.create({
      data: {
        topic,
        levelB2: textB2,
        levelC2: textC2,
        audioB2,
        audioC2,
        language,
        date: new Date(),
      },
    });
  }
}
