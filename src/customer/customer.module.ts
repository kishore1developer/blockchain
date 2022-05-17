import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerContoller } from './customer.controller';
import { CustomerPostEntity } from './post.entity';
import { CustomerService } from './customer.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerPostEntity])
    ],
    providers: [CustomerService],
    controllers: [CustomerContoller]
})
export class CustomerModule {}