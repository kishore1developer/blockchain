import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoolActivityContoller } from './poolActivity.controller';
import { PoolActivityService } from './poolActivity.service';
import { PoolActivityPostEntity } from './post.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([PoolActivityPostEntity])
    ],
    providers: [PoolActivityService],
    controllers: [PoolActivityContoller]
})
export class PoolActivityModule {}