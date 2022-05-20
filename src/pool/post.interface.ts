import { ApiProperty } from "@nestjs/swagger";

export interface PoolPost {
    id?: number;
    coin1?: string;
    coin2?: string;
    coin1Token?: string;
    coin2Token?: string;
    coinPair?: string;
    contractAddress?: string;
    contractAbiJson?: string;
}

export class poolVal {
    @ApiProperty()
    coinPair?: string;
}