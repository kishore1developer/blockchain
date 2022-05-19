import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pool_activity')
export class PoolActivityPostEntity {
    @PrimaryGeneratedColumn()
    pid: number;

    @Column()
    id?: string;

    @Column({default:null})
    address?: string;

    @Column({default:null})
    blockHash?: string;

    @Column({default:null})
    blockNumber?: string;

    @Column({default:null})
    logIndex?: string;

    @Column({default:null})
    removed?: string;

    @Column({default:null})
    transactionHash?: string;

    @Column({default:null})
    returnValues?: string;

    @Column({default:null})
    event?: string;

    @Column({default:null})
    signature?: string;


    @Column({default:null})
    transactionIndex?: string;

    @Column({default:null})
    owner?: string;

    @Column({default:null})
    recipient?: string;

    @Column({default:null})
    sender?: string;

    @Column({default:null})
    tickLower?: string;

    @Column({default:null})
    tickUpper?: string;

    @Column({default:null})
    amount?: string;

    @Column({default:null})
    amount0?: string;

    @Column({default:null})
    amount1?: string;

    @Column({default:null})
    sqrtPriceX96?: string;

    @Column({default:null})
    liquidity?: string;

    @Column({default:null})
    tick?: string;

    @Column({default:null})
    rawdata?: string;

    @Column({default:null})
    rawtopics?: string;

    @Column({default:null})
    timestamp?: string;
}