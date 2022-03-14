import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Wearable } from "./wearable.entity";

@Entity('wearable_types')
export class WearableType extends BaseEntity {
    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;

    @OneToMany(type => Wearable, wearable => wearable.wearableType)
    weareables: Wearable[]
}