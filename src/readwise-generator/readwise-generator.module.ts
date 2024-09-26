import { Module } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';
import { ReadwiseGeneratorController } from './readwise-generator.controller';

@Module({
  providers: [ReadwiseGeneratorService],
  controllers: [ReadwiseGeneratorController],
})
export class ReadwiseGeneratorModule {}
