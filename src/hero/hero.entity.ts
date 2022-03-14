import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity('heros')
export class Hero extends BaseEntity{
    @Column({nullable: false})
    image: string;

    @Column({nullable: false})
    name: string;

    @Column({type: 'float', nullable: false})
    rarity: number;

    @Column({nullable: false})
    character: string;

    @Column({type: 'int', nullable: false})
    tier: number;

    @Column({nullable: false})
    title: string;

    @Column({type: 'int', nullable: false})
    strength: number;

    @Column({nullable: false})
    background: string;

    @Column({type: 'int',nullable: false})
    cunning: number;

    @Column({type: 'int',nullable: false})
    will: number;

    @Column({type: 'int',nullable: false})
    hero_number: number;

    @Column({nullable: false})
    staked: boolean;
}