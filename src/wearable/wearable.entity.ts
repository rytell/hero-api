import { Hero } from "src/hero/hero.entity";
import { Column, Entity, ManyToOne, OneToMany, ManyToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { WearableAttribute } from "./wearableAttribute.entity";
import { WearableType } from "./wearableType.entity";

@Entity('wearables')
export class Wearable extends BaseEntity {

    @ManyToOne(type => WearableType, wereable_type => wereable_type.weareables)
    wearableType: WearableType

    @OneToMany(type => WearableAttribute, wearableAttribute => wearableAttribute.wearable)
    weareableAttribute: WearableAttribute[];

    @ManyToMany(type => Hero, hero => hero.wearables)
    heros: Hero[];
}