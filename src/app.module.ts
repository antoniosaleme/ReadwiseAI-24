import { Module } from '@nestjs/common';
import { ReadwiseGeneratorModule } from './readwise-generator/readwise-generator.module';

@Module({
  imports: [ReadwiseGeneratorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
