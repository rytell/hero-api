import { Module } from '@nestjs/common';
import { WearableService } from './wearable.service';
import { WearableController } from './wearable.controller';

@Module({
  providers: [WearableService],
  controllers: [WearableController]
})
export class WearableModule {}
