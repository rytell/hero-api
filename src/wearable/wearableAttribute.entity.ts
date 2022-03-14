import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity('wearable_attributes')
export class WearableAttributes extends BaseEntity {
    @Column({type: 'int', nullable: false})
    type_id: number;

    @Column({type: 'int', nullable: false})
    wearable_id: number;

    @Column({type: 'int', nullable: true})
    value: number;
}