import { ApiProperty } from "@nestjs/swagger";

export interface PoolActivityPost {
    id?: string;
    address?: string;
    blockHash?: string;
    blockNumber?: string;
    logIndex?: string;
    removed?: string;
    transactionHash?: string;
    event?: string;
    signature?: string;
    transactionIndex?: string;
    owner?: string;
    recipient?: string;
    sender?: string;
    tickLower?: string;
    tickUpper?: string;
    amount?: string;
    amount0?: string;
    amount1?: string;
    sqrtPriceX96?: string;
    liquidity?: string;
    tick?: string;
    timestamp?: string;
    rawData?: string;
    rawTopics?: string;
    poolPair?: string;
}

export class poolActivityVal {
    @ApiProperty()
    event?: string;
    @ApiProperty()
    poolPair?: string;
}

export class reIndexVal{
    @ApiProperty()
    contractAddress?: string;
    @ApiProperty()
    contractAbi?: string;
    @ApiProperty()
    poolPair?: string;
}