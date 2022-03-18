import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero';
import { Hero } from './hero.entity';

@Injectable()
export class HeroService {
  constructor(
      @InjectRepository(Hero)
      private readonly herosRepository: Repository<Hero>,
      private httpService: HttpService,
    ) {}
  //   createHero: Hero
  async create( createHeroDto: CreateHeroDto): Promise<Hero>|undefined {

    let heroDB = await this.herosRepository.findOne({hero_number: createHeroDto.heroNumber})

    if(heroDB){
      if(heroDB?.block_number < createHeroDto.blockNumber){
        const heroAPI = await this.getHeroMetadata(createHeroDto)
        const hero = {...heroDB, 
          ...heroAPI, 
          updated_at: new Date(new Date().toUTCString()),
        }
        return this.herosRepository.save(hero);
      }else {
        return heroDB;
      }
    } else {
      const heroAPI = await this.getHeroMetadata(createHeroDto)
      heroAPI.staked = false;
      return this.herosRepository.save(heroAPI);
    }
  }

  async getHeroMetadata( createHeroDto:CreateHeroDto ): Promise<Hero> {
    let heroAttr:any = {}
    const response  = await firstValueFrom(this.httpService.get(
        `https://rytell.mypinata.cloud/ipfs/QmXHJfoMaDiRuzgkVSMkEsMgQNAtSKr13rtw5s59QoHJAm/${createHeroDto.heroNumber}.json`,
      ));
    
    response.data.attributes.forEach( attr => {
      const attrName = attr.trait_type.toString().toLowerCase();
      const value = attr.value
      heroAttr[attrName] = value
    });
    const hero = new Hero();
    hero.image = response.data.image;
    hero.name = response.data.name;
    hero.rarity = parseFloat(heroAttr.rarity);
    hero.character = heroAttr.character;
    hero.tier = heroAttr.tier;
    hero.title = heroAttr.title;
    hero.background = heroAttr.background;
    hero.strength = heroAttr.strength;
    hero.will = heroAttr.will;
    hero.cunning = heroAttr.cunning;
    hero.block_number = createHeroDto.blockNumber
    hero.hero_number = createHeroDto.heroNumber
    return hero
  }
  

  async findAll(): Promise<Hero[]> {
    return this.herosRepository.find();
  }

  findOne(id: string): Promise<Hero> {
    return this.herosRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.herosRepository.delete(id);
  }
}
