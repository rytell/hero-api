import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity('wearables_attribute_types')
export class WearableAttributeType extends BaseEntity {
    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    default_value: number;
}