import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { ClaimHeroDto } from './dto/claim-hero';
import { CreateHeroDto } from './dto/create-hero';
import { SimulateClaimDto } from './dto/simulate-claim';
import { Hero } from './hero.entity';
import { HeroService } from './hero.service';

@Controller('hero')
export class HeroController {
    constructor(private readonly heroService: HeroService) {}

    @Post()
    create(@Body() body): Promise<Hero> {
        const createHeroDto: CreateHeroDto = body.createHeroDto;
        return this.heroService.create(createHeroDto);
    }

    @Get()
    findAll(): Promise<Hero[]> {
        return this.heroService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Hero> {
        return this.heroService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.heroService.remove(id);
    }

    @Get('daily-rate/:hero')
    earningRate(@Param('hero') hero: number): {
        dailyRate: number;
    } {
        return this.heroService.getEarningRate(hero);
    }

    @Post('simulate-claim')
    simulateClaim(@Body() body): Promise<SimulateClaimDto> {
        const simulateClaimHeroDTO: CreateHeroDto = body.createHeroDto;
        return this.heroService.simulateClaim(simulateClaimHeroDTO);
    }

    @Post('claim')
    claim(@Body() body): Promise<any> {
        const claimHeroDto: ClaimHeroDto = body.claimHeroDto;
        return this.heroService.claimHero(claimHeroDto);
    }
}
