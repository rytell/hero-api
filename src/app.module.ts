import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StakeController } from './stake/stake.controller';
import { StakeModule } from './stake/stake.module';
import { UnstakeController } from './unstake/unstake.controller';
import { UnstakeModule } from './unstake/unstake.module';
import { ClaimController } from './claim/claim.controller';
import { ClaimModule } from './claim/claim.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';

@Module({
  imports: [StakeModule, UnstakeModule, ClaimModule, TypeOrmModule.forRoot(config)],
  controllers: [AppController, StakeController, UnstakeController, ClaimController],
  providers: [AppService],
})
export class AppModule {}
