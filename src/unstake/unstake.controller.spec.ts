import { Test, TestingModule } from '@nestjs/testing';
import { UnstakeController } from './unstake.controller';

describe('UnstakeController', () => {
  let controller: UnstakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnstakeController],
    }).compile();

    controller = module.get<UnstakeController>(UnstakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
