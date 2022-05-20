import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PoolPostEntity } from './post.entity';

@Injectable()
export class PoolService {
    constructor(
        @InjectRepository(PoolPostEntity)
        private readonly poolPostRepository: Repository<PoolPostEntity>,
    ) { }

    async findPoolPair(coinPair) {
        try{
            const result = await this.poolPostRepository.find({where:coinPair});
            return result.map(element => ({
                id: element.id,
                coin1: element.coin1,
                coin2: element.coin2,
                coin1Token: element.coin1Token,
                coin2Token: element.coin2Token,
                coinPair: element.coinPair,
                contractAddress: element.contractAddress,
                contractAbiJson: JSON.parse(element.contractAbiJson),
            }));
        }catch(err){
            return err;
        }
    }

    async findAllPairName() {
        try{
            const result = await this.poolPostRepository.query('select "coinPair" from pool');
            return result.map(a => a.coinPair);
        }catch(err){
            return err;
        }
    }
}