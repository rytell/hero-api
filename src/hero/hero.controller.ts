import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
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

  @Get('simulate-claim/:heroNumber')
  simulateClaim(@Param('heroNumber') heroNumber: number): Promise<SimulateClaimDto> {
    return this.heroService.simulateClaim(+heroNumber);
  }
}
