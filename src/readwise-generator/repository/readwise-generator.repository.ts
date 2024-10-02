import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReadwiseGeneratorDto } from '../dto/create-readwise-generator.dto';

const prisma = new PrismaClient();

@Injectable()
export class ReadwiseGeneratorRepository {
  async findAll() {
    return prisma.generatedText.findMany();
  }

  async findByDateRange(startOfDay: Date, endOfDay: Date) {
    return prisma.generatedText.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }

  async saveContent(createReadwiseGeneratorDto: CreateReadwiseGeneratorDto) {
    return prisma.generatedText.create({
      data: createReadwiseGeneratorDto,
    });
  }
}
