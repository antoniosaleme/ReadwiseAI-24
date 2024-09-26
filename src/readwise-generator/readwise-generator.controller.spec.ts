import { Test, TestingModule } from '@nestjs/testing';
import { ReadwiseGeneratorController } from './readwise-generator.controller';

describe('ReadwiseGeneratorController', () => {
  let controller: ReadwiseGeneratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReadwiseGeneratorController],
    }).compile();

    controller = module.get<ReadwiseGeneratorController>(ReadwiseGeneratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
