import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('customer_post')
export class CustomerPostEntity {
    @PrimaryGeneratedColumn()
    @Index()
    id: number;

    @Column({default:''})
    name: string;

    @Column({default:''})
    email: string;

    @Column({default:''})
    mobile: string;

    @Column({type: 'timestamp', default:() => 'CURRENT_TIMESTAMP' })
    createdAt:Date;
}