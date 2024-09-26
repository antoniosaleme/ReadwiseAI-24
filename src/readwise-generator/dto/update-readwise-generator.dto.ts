import { PartialType } from '@nestjs/mapped-types';
import { CreateReadwiseGeneratorDto } from './create-readwise-generator.dto';

export class UpdateReadwiseGeneratorDto extends PartialType(
  CreateReadwiseGeneratorDto,
) {}
