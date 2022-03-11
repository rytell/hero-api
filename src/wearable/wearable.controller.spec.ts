import { Test, TestingModule } from '@nestjs/testing';
import { WearableController } from './wearable.controller';

describe('WearableController', () => {
  let controller: WearableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WearableController],
    }).compile();

    controller = module.get<WearableController>(WearableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
