import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateHeroDto } from './dto/create-hero';
import { Hero } from './hero.entity';
import { HeroContract, STAKING_HERO } from '../constants/constants';
import abi from '../constants/abis/staking-hero.json';
import { heroFromProps } from 'src/utils/heroFromProps';
@Injectable()
export class HeroService {
    constructor(
        @InjectRepository(Hero)
        private readonly herosRepository: Repository<Hero>,
        private httpService: HttpService,
    ) {}
    //   createHero: Hero
    async create(createHeroDto: CreateHeroDto): Promise<Hero> | undefined {
        const validateErrors = this.validateHeroDTO(createHeroDto);
        if( validateErrors.length > 0 ){
            throw validateErrors
        }
        
        const heroDB = await this.herosRepository.findOne({
            hero_number: createHeroDto.heroNumber,
        });

        const herosAtContract: HeroContract[] = (
            await this.getCallerHerosStatus(createHeroDto.staker)
        ).map((heroProps) => heroFromProps(heroProps));

        const heroContract = herosAtContract?.find(
            (heroProps) =>
                heroProps.heroId === createHeroDto.heroNumber.toString(),
        ) as HeroContract;

        if (!heroContract) {
            return;
        }

        if (heroDB) {
            if (heroDB?.lastStaked < heroContract.lastStaked || heroDB?.lastUnstaked < heroContract.lastUnstaked ) {
                const hero: Hero = {
                    ...heroDB,
                    staked: heroContract.staked,
                    lastStaked: heroContract.lastStaked,
                    lastUnstaked: heroContract.lastUnstaked,
                    updated_at: new Date(new Date().toUTCString()),
                };
                return this.herosRepository.save(hero);
            } else {
                return heroDB;
            }
        } else {
            const heroAPI = await this.getHeroMetadata(createHeroDto);

            heroAPI.staked = heroContract.staked;
            heroAPI.lastStaked = heroContract.lastStaked;
            heroAPI.lastUnstaked = heroContract.lastUnstaked;
            heroAPI.hero_number = +heroContract.heroId;
            return this.herosRepository.save(heroAPI);
        }
    }

    async getHeroMetadata(createHeroDto: CreateHeroDto): Promise<Hero> {
        const heroAttr: any = {};
        const response = await firstValueFrom(
            this.httpService.get(
                `https://rytell.mypinata.cloud/ipfs/QmXHJfoMaDiRuzgkVSMkEsMgQNAtSKr13rtw5s59QoHJAm/${createHeroDto.heroNumber}.json`,
            ),
        );

        response.data.attributes.forEach((attr) => {
            const attrName = attr.trait_type.toString().toLowerCase();
            const value = attr.value;
            heroAttr[attrName] = value;
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
        hero.hero_number = createHeroDto.heroNumber;
        return hero;
    }

    async getCallerHerosStatus(caller: string) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Web3 = require('web3');
        const web3 = new Web3(
            new Web3.providers.WebsocketProvider(
                'wss://api.avax-test.network/ext/bc/C/ws',
            ),
        );

        const stakeHeroContract = new web3.eth.Contract(
            abi,
            STAKING_HERO[process.env.CHAIN || 43113],
        );

        // TODO: check hero current status
        return await stakeHeroContract.methods
            .getStakedHeros()
            .call({ from: caller });
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

    validateHeroDTO(createHeroDto: CreateHeroDto): string {
        if( createHeroDto.heroNumber != null ){
            if( +createHeroDto.heroNumber === 0 ){
                return 'Error, heroNumber required';
            }
        } else {
            return 'Error, heroNumber required';
        }

        if( createHeroDto.staker != null ){
            if( createHeroDto.staker?.trim() === '' ){
                return 'Error, staker required';
            }
        } else {
            return 'Error, staker required';
        }
        return ''
    }
}
