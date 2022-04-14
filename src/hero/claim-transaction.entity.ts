import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('claim-transactions')
export class ClaimTransaction extends BaseEntity {
    @Column({ nullable: false, unique: true })
    hash: string;

    @Column({ type: 'int', nullable: false })
    character: number;

    @Column({ nullable: true })
    staker: string;

    @Column({ type: 'float', nullable: false })
    value: number;

    @Column({ type: 'float', nullable: false, default: 0 })
    radiValue: number;

    @Column({ nullable: false })
    redeemed: boolean;
}
