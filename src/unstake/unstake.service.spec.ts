import { Test, TestingModule } from '@nestjs/testing';
import { UnstakeService } from './unstake.service';

describe('UnstakeService', () => {
  let service: UnstakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnstakeService],
    }).compile();

    service = module.get<UnstakeService>(UnstakeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
