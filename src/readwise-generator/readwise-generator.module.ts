import { Module } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';

@Module({
  providers: [ReadwiseGeneratorService],
})
export class ReadwiseGeneratorModule {}
