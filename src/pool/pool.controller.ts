import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { PoolService } from "./pool.service";
import { poolVal } from "./post.interface";

@ApiTags('Pool')
@Controller('pool')
export class PoolContoller {
    constructor(private poolService: PoolService) { }

    findByPair(@Body() body) {
        try{
            return this.poolService.findPoolPair(body);
        }catch(err){
            return err;
        }
    }
    
    @Post('/listPairName')
    findAllPairName() {
        try{
            return this.poolService.findAllPairName();
        }catch(err){
            return err;
        }
    }
    
}