import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StakeController } from './stake/stake.controller';
import { StakeModule } from './stake/stake.module';
import { UnstakeController } from './unstake/unstake.controller';
import { UnstakeModule } from './unstake/unstake.module';
import { ClaimController } from './claim/claim.controller';
import { ClaimModule } from './claim/claim.module';
import { HeroModule } from './hero/hero.module';
import { WearableModule } from './wearable/wearable.module';

@Module({
  imports: [
    HttpModule,
    StakeModule,
    UnstakeModule,
    ClaimModule,
    // TypeOrmModule.forRoot(config),
    HeroModule,
    WearableModule,
  ],
  controllers: [
    AppController,
    StakeController,
    UnstakeController,
    ClaimController,
  ],
  providers: [AppService],
})
export class AppModule {}
