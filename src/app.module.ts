import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StakeController } from './stake/stake.controller';
import { StakeModule } from './stake/stake.module';
import { UnstakeController } from './unstake/unstake.controller';
import { UnstakeModule } from './unstake/unstake.module';
import { ClaimController } from './claim/claim.controller';
import { ClaimModule } from './claim/claim.module';

@Module({
  imports: [StakeModule, UnstakeModule, ClaimModule],
  controllers: [AppController, StakeController, UnstakeController, ClaimController],
  providers: [AppService],
})
export class AppModule {}
