import { Module } from '@nestjs/common';
import { UnstakeService } from './unstake.service';

@Module({
  providers: [UnstakeService],
  exports: [UnstakeService],
})
export class UnstakeModule {}
