import { Wearable } from 'src/wearable/wearable.entity';
import { Column, Entity, ManyToMany, JoinTable, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '../base-entity';

@Entity('heros')
export class Hero extends BaseEntity {
    @Column({ nullable: false })
    image: string;

    @Column({ nullable: false })
    name: string;

    @Column({ type: 'float', nullable: false })
    rarity: number;

    @Column({ nullable: false })
    character: string;

    @Column({ type: 'int', nullable: false })
    tier: number;

    @Column({ nullable: false })
    title: string;

    @Column({ type: 'int', nullable: false })
    strength: number;

    @Column({ nullable: false })
    background: string;

    @Column({ type: 'int', nullable: false })
    cunning: number;

    @Column({ type: 'int', nullable: false })
    will: number;

    @PrimaryColumn({ type: 'int', nullable: false })
    hero_number: number;

    @Column({ nullable: false })
    staked: boolean;

    @Column({ nullable: true })
    staker: string;

    @Column({ nullable: true })
    lastClaim: string;

    @Column({ nullable: true })
    lastStaked: string;

    @Column({ nullable: true })
    lastUnstaked: string;

    @ManyToMany((type) => Wearable, (wearable) => wearable.heros)
    @JoinTable()
    wearables: Wearable[];
}
