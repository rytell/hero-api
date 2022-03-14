import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../base-entity";
import { WearableAttribute } from "./wearableAttribute.entity";

@Entity('wearables_attribute_types')
export class WearableAttributeType extends BaseEntity {
    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    default_value: number;

    @OneToMany(type => WearableAttribute, wearableAttribute => wearableAttribute.wearableAttributeType)
    weareableAttribute: WearableAttribute[]
}