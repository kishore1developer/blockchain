import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult, UpdateResult } from "typeorm";

import { CreateCustomer, CustomerPost } from "./post.interface";
import { CustomerService } from "./customer.service";

@ApiTags('Customer')
@Controller('customer')
export class CustomerContoller{
    constructor(private customerService: CustomerService){}
    
    @Post()
    create(@Body() post: CreateCustomer): Promise<CustomerPost> {
        return this.customerService.createPost(post);
    }

    @Get()
    findAll():Promise<CustomerPost[]>{
        return this.customerService.findAllPosts();
    }

    @Get(':id')
    findOne(@Param('id')id: number): Promise<CustomerPost>{
        return this.customerService.getCustomer(id);
    }

    @Put(':id')
    update(
        @Param('id')id: number,
        @Body() customerPost: CreateCustomer,
    ):Promise<UpdateResult>{
        return this.customerService.updatePost(id,customerPost);
    }

    @Delete(':id')
    delete(@Param('id')id: number):Promise<DeleteResult>{
        return this.customerService.deletePost(id);
    }
}