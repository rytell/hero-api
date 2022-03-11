import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity('wearable_types')
export class WearableType extends BaseEntity {
    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    description: string;
}