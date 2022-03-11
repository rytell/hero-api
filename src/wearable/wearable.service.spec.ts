import { Test, TestingModule } from '@nestjs/testing';
import { WearableService } from './wearable.service';

describe('WearableService', () => {
  let service: WearableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WearableService],
    }).compile();

    service = module.get<WearableService>(WearableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
