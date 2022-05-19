import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import ABI from "../abi.json";
import { PoolActivityService } from "./poolActivity.service";
import { PoolActivityPost, poolActivityVal } from "./post.interface";
const Web3 = require('web3');

@ApiTags('Pool Activity')
@Controller('poolActivity')
export class PoolActivityContoller {
    constructor(private poolActivityService: PoolActivityService) { }

    @Get('/storeBlockChain')
    async storeBlockVal() {
        const web3 = new Web3("https://mainnet.infura.io/v3/b945d3c85e8e4bf7b8db8a484ca166a0");

        //ENTER SMART CONTRACT ADDRESS BELOW. see abi.js if you want to modify the abi
        const CONTRACT_ADDRESS = "0x8ad599c3A0ff1De082011EFDDc58f1908eb6e6D8";
        const CONTRACT_ABI = ABI;
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        let latest_block = await web3.eth.getBlockNumber();
        let historical_block = latest_block - 10000; // you can also change the value to 'latest' if you have a upgraded rpc

        const eventVal = ["Swap", "Burn", "Collect", "CollectProtocol", "Flash", "IncreaseObservationCardinalityNext", "Initialize", "Mint", "SetFeeProtocol"];
        eventVal.forEach(async element => {
            const data_events = await contract.getPastEvents(element, { fromBlock: historical_block, toBlock: 'latest' });
            let i = 0;
            for (i = 0; i < data_events.length; i++) {
                let web3Timestamp = await web3.eth.getBlock(data_events[i].blockNumber);
                let timeStampVal = web3Timestamp.timestamp;
                var poolActivity = {
                    address: data_events[i].address ? data_events[i].address : null,
                    blockHash: data_events[i].blockHash ? data_events[i].blockHash : null,
                    blockNumber: data_events[i].blockNumber ? data_events[i].blockNumber : null,
                    logIndex: data_events[i].logIndex ? data_events[i].logIndex : null,
                    removed: data_events[i].removed,
                    transactionHash: data_events[i].transactionHash ? data_events[i].transactionHash : null,
                    transactionIndex: data_events[i].transactionIndex ? data_events[i].transactionIndex : null,
                    id: data_events[i].id ? data_events[i].id : null,
                    event: data_events[i].event ? data_events[i].event : null,
                    signature: data_events[i].signature ? data_events[i].signature : null,
                    owner: data_events[i].returnValues.owner ? data_events[i].returnValues.owner : null,
                    recipient: data_events[i].returnValues.recipient ? data_events[i].returnValues.recipient : null,
                    sender: data_events[i].returnValues.sender ? data_events[i].returnValues.sender : null,
                    tickLower: data_events[i].returnValues.tickLower ? data_events[i].returnValues.tickLower : null,
                    tickUpper: data_events[i].returnValues.tickUpper ? data_events[i].returnValues.tickUpper : null,
                    amount: data_events[i].returnValues.amount ? data_events[i].returnValues.amount : null,
                    amount0: data_events[i].returnValues.amount0 ? data_events[i].returnValues.amount0 : null,
                    amount1: data_events[i].returnValues.amount1 ? data_events[i].returnValues.amount1 : null,
                    sqrtPriceX96: data_events[i].returnValues.sqrtPriceX96 ? data_events[i].returnValues.sqrtPriceX96 : null,
                    liquidity: data_events[i].returnValues.liquidity ? data_events[i].returnValues.liquidity : null,
                    tick: data_events[i].returnValues.tick ? data_events[i].returnValues.tick : null,
                    timestamp: timeStampVal ? timeStampVal : null,
                    rawData: data_events[i].raw.data ? data_events[i].raw.data : null,
                    rawTopics: JSON.stringify(data_events[i].raw.topics)? JSON.stringify(data_events[i].raw.topics): null,
                }
                await this.poolActivityService.createPost(poolActivity);
            }
        });
        return 'Pool Activity Created Successfully';
    }

    @Post()
    @ApiBody({type: poolActivityVal})
    findAll(@Body() body: PoolActivityPost) {
        try{
            return this.poolActivityService.findAllPoolActivity(body);
        }catch(err){
            return err;
        }
    }
}