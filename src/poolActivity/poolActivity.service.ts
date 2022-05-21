import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository } from 'typeorm';

import { PoolActivityPostEntity } from './post.entity';
import { PoolActivityPost } from './post.interface';


@Injectable()
export class PoolActivityService {
    constructor(
        @InjectRepository(PoolActivityPostEntity)
        private readonly poolActivityPostRepository: Repository<PoolActivityPostEntity>,
    ) { }

    async createPost(poolActivityPost: PoolActivityPost) {
        try{
            await this.poolActivityPostRepository.save(poolActivityPost);
        }catch(err){
            return err;
        }
    }

    async deletePoolPair(poolPair: string) {
        try{
            const result = await this.poolActivityPostRepository.delete({'poolPair': poolPair});
            return result;
        }catch(err){
            return err;
        }
    }

    async findAllPoolActivity(event) {
        try{
            const result = await this.poolActivityPostRepository.find({where:event});
            return result;
        }catch(err){
            return err;
        }
    }
}