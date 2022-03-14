import { Column, Entity } from "typeorm";
import { BaseEntity } from "../base-entity";

@Entity('wearables')
export class Wearable extends BaseEntity {
    @Column({type:'int', nullable: false})
    wearable_type_id: number;
}