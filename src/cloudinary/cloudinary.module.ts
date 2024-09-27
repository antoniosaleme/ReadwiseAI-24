import { forwardRef, Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryController } from './cloudinary.controller';
import { ConfigModule } from '@nestjs/config';
import { ReadwiseGeneratorModule } from 'src/readwise-generator/readwise-generator.module';

@Module({
  imports: [ConfigModule, forwardRef(() => ReadwiseGeneratorModule)],
  providers: [CloudinaryService],
  controllers: [CloudinaryController],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
