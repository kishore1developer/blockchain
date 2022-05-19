import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import ABI from "../abi.json";
import { PoolActivityService } from "./poolActivity.service";
const Web3 = require('web3');

@ApiTags('Pool Activity')
@Controller('poolActivity')
export class PoolActivityContoller {
    constructor(private poolActivityService: PoolActivityService) { }
    @Get('/storeBlockChain')
    async storeBlockVal() {
        const web3 = new Web3("https://mainnet.infura.io/v3/b945d3c85e8e4bf7b8db8a484ca166a0");

        const CONTRACT_ADDRESS = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
        const CONTRACT_ABI = ABI;
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        let latest_block = await web3.eth.getBlockNumber();
        let historical_block = latest_block - 10000; // you can also change the value to 'latest' if you have a upgraded rpc

        const eventVal = ["Swap", "Burn", "Collect", "CollectProtocol", "Flash", "IncreaseObservationCardinalityNext", "Initialize", "Mint", "SetFeeProtocol"];
        let i = 0;
        eventVal.forEach(async element => {
            const data_events = await contract.getPastEvents(element, { fromBlock: historical_block, toBlock: 'latest' });
            for (i = 0; i < data_events.length; i++) {
                return this.poolActivityService.createPost(data_events);
            };
        });
    }
}