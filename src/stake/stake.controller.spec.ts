import { Test, TestingModule } from '@nestjs/testing';
import { StakeController } from './stake.controller';

describe('StakeController', () => {
  let controller: StakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakeController],
    }).compile();

    controller = module.get<StakeController>(StakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
