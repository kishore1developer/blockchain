import { ApiProperty } from '@nestjs/swagger';

export interface CustomerPost {
    id?: number;
    name?: string;
    email?: string;
    mobile?: string;
    createdAt?: Date;
}

export class CreateCustomer {
    @ApiProperty()
    name?: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    mobile?: string;
}