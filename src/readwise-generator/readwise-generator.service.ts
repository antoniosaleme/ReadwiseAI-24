import { Injectable } from '@nestjs/common';
import { CreateReadwiseGeneratorDto } from './dto/create-readwise-generator.dto';
import { UpdateReadwiseGeneratorDto } from './dto/update-readwise-generator.dto';

@Injectable()
export class ReadwiseGeneratorService {
  create(createReadwiseGeneratorDto: CreateReadwiseGeneratorDto) {
    return 'This action adds a new readwiseGenerator';
  }

  findAll() {
    return `This action returns all readwiseGenerator`;
  }

  findOne(id: number) {
    return `This action returns a #${id} readwiseGenerator`;
  }

  update(id: number, updateReadwiseGeneratorDto: UpdateReadwiseGeneratorDto) {
    return `This action updates a #${id} readwiseGenerator`;
  }

  remove(id: number) {
    return `This action removes a #${id} readwiseGenerator`;
  }
}
