import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PoolActivityPostEntity } from './post.entity';
import { PoolActivityPost } from './post.interface';


@Injectable()
export class PoolActivityService {
    constructor(
        @InjectRepository(PoolActivityPostEntity)
        private readonly poolActivityPostRepository: Repository<PoolActivityPostEntity>,
    ) { }
    createPost(poolActivityPost: PoolActivityPost): Promise<PoolActivityPost> {
        return this.poolActivityPostRepository.save(poolActivityPost);
    }
}