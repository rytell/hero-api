import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HeroModule } from './hero/hero.module';
import { WearableModule } from './wearable/wearable.module';

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forRoot(config),
        HeroModule,
        WearableModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
