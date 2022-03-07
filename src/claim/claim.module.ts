import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';

@Module({
  providers: [ClaimService],
  exports: [ClaimService]
})
export class ClaimModule {}
