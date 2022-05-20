import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pool')
export class PoolPostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:null})
    coin1?: string;

    @Column({default:null})
    coin2?: string;

    @Column({default:null})
    coin1Token?: string;

    @Column({default:null})
    coin2Token?: string;

    @Column({default:null})
    coinPair?: string;

    @Column({default:null})
    contractAddress?: string;

    @Column({default:null})
    contractAbiJson?: string;
}