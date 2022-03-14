import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../base-entity";
import { Wearable } from "./wearable.entity";
import { WearableAttributeType } from "./wearableAttributeType.entity";

@Entity('wearable_attributes')
export class WearableAttribute extends BaseEntity {
    @Column({type: 'int', nullable: false})
    type_id: number;

    @Column({type: 'int', nullable: true})
    value: number;

    @ManyToOne(type => Wearable, wereable => wereable.weareableAttribute)
    wearable: Wearable

    @ManyToOne(type => WearableAttributeType, wereableAttributeType => wereableAttributeType.weareableAttribute)
    wearableAttributeType: WearableAttributeType
}