import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CustomerPostEntity } from './post.entity';
import { CustomerPost } from './post.interface';


@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(CustomerPostEntity)
        private readonly customerPostRepository: Repository<CustomerPostEntity>,
    ) { }

    createPost(customerPost: CustomerPost): Promise<CustomerPost> {
        return this.customerPostRepository.save(customerPost);
    }

    findAllPosts(): Promise<CustomerPost[]> {
        const result = this.customerPostRepository.find();
        return result;
    }

    getCustomer(id: number): Promise<CustomerPost> {
        return this.customerPostRepository.findOne({where: {'id': id}});
    }

    updatePost(id: number, customerPost: CustomerPost): Promise<UpdateResult> {
        return this.customerPostRepository.update(id, customerPost);
    }

    deletePost(id: number): Promise<DeleteResult> {
        return this.customerPostRepository.delete(id);
    }
}
