import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('claim-transactions')
export class ClaimTransaction extends BaseEntity {
    @PrimaryColumn({ nullable: false })
    hash: string;

    @Column({ type: 'int', nullable: false })
    character: number;

    @Column({ nullable: true })
    staker: string;

    @Column({ type: 'float', nullable: false })
    value: number;

    @Column({ nullable: false })
    redeemed: boolean;
}
