import { forwardRef, Module } from '@nestjs/common';
import { ReadwiseGeneratorService } from './readwise-generator.service';
import { ReadwiseGeneratorController } from './readwise-generator.controller';
import { GenerateContentUseCase } from './use-case';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ReadwiseGeneratorRepository } from './repository/readwise-generator.repository';

@Module({
  imports: [forwardRef(() => CloudinaryModule)],
  providers: [
    ReadwiseGeneratorService,
    GenerateContentUseCase,
    ReadwiseGeneratorRepository,
  ],
  exports: [GenerateContentUseCase, ReadwiseGeneratorRepository],
  controllers: [ReadwiseGeneratorController],
})
export class ReadwiseGeneratorModule {}
