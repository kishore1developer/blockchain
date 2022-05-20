import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolContoller } from './pool.controller';
import { PoolService } from './pool.service';
import { PoolPostEntity } from './post.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PoolPostEntity])
    ],
    providers: [PoolService],
    controllers: [PoolContoller]
})
export class PoolModule {}