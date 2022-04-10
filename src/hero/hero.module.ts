import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HeroService } from './hero.service';
import { HeroController } from './hero.controller';
import { Hero } from './hero.entity';
import { ClaimTransaction } from './claim-transaction.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Hero, ClaimTransaction]), HttpModule],
    providers: [HeroService],
    controllers: [HeroController],
})
export class HeroModule {}
