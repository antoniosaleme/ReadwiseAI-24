import { Module } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';
import { ReadwiseGeneratorController } from './readwise-generator.controller';

@Module({
  controllers: [ReadwiseGeneratorController],
  providers: [ReadwiseGeneratorService],
})
export class ReadwiseGeneratorModule {}
