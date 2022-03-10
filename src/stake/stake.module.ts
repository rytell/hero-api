import { Module } from '@nestjs/common';
import { StakeService } from './stake.service';

@Module({
  providers: [StakeService],
  exports: [StakeService],
})
export class StakeModule {}
