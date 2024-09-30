import { forwardRef, Module } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';
import { ReadwiseGeneratorController } from './readwise-generator.controller';
import { GenerateContentUseCase } from './use-case';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [forwardRef(() => CloudinaryModule)],
  providers: [ReadwiseGeneratorService, GenerateContentUseCase],
  exports: [ReadwiseGeneratorService, GenerateContentUseCase],
  controllers: [ReadwiseGeneratorController],
})
export class ReadwiseGeneratorModule {}
