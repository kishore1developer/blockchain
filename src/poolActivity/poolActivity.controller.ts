import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import ABI from "../abi.json";
import { PoolActivityService } from "./poolActivity.service";
import { PoolActivityPost, poolActivityVal, reIndexVal } from "./post.interface";
const Web3 = require('web3');

@ApiTags('Pool Activity')
@Controller('poolActivity')
export class PoolActivityContoller {
    constructor(private poolActivityService: PoolActivityService) { }

    @Post('/reIndexing')
    @ApiBody({ type: reIndexVal })
    async storeBlockVal(@Body() body) {
        const web3 = new Web3("https://mainnet.infura.io/v3/b945d3c85e8e4bf7b8db8a484ca166a0");

        //ENTER SMART CONTRACT ADDRESS BELOW. see abi.js if you want to modify the abi
        const CONTRACT_ADDRESS = body.contractAddress;
        const CONTRACT_ABI = body.contractAbi;
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

        let latest_block = await web3.eth.getBlockNumber();
        let historical_block = latest_block - 10000; // you can also change the value to 'latest' if you have a upgraded rpc

        const poolPairLength = await this.poolActivityService.findAllPoolActivity({ poolPair: body.poolPair });
        if (poolPairLength.length == 0) {
            await this.swap(web3, contract, historical_block, body);
            await this.burn(web3, contract, historical_block, body);
            await this.collect(web3, contract, historical_block, body);
            await this.collectProtocol(web3, contract, historical_block, body);
            await this.flash(web3, contract, historical_block, body);
            await this.increaseObservationCardinalityNext(web3, contract, historical_block, body);
            await this.initialize(web3, contract, historical_block, body);
            await this.mint(web3, contract, historical_block, body);
            await this.setFeeProtocol(web3, contract, historical_block, body);
            return 'Pool Activity Created Successfully';
        } else {
            const result = await this.poolActivityService.deletePoolPair(body.poolPair);
            if (result.affected != 0) {
                await this.swap(web3, contract, historical_block, body);
                await this.burn(web3, contract, historical_block, body);
                await this.collect(web3, contract, historical_block, body);
                await this.collectProtocol(web3, contract, historical_block, body);
                await this.flash(web3, contract, historical_block, body);
                await this.increaseObservationCardinalityNext(web3, contract, historical_block, body);
                await this.initialize(web3, contract, historical_block, body);
                await this.mint(web3, contract, historical_block, body);
                await this.setFeeProtocol(web3, contract, historical_block, body);
                return 'Pool Activity Created Successfully';
            }
        }
    }

    @Post()
    @ApiBody({ type: poolActivityVal })
    findAll(@Body() body) {
        try {
            return this.poolActivityService.findAllPoolActivity(body);
        } catch (err) {
            return err;
        }
    }

    async swap(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("Swap", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async burn(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("Burn", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async collect(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("Collect", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async collectProtocol(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("CollectProtocol", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async flash(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("Flash", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async increaseObservationCardinalityNext(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("IncreaseObservationCardinalityNext", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async initialize(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("Initialize", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async mint(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("Mint", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };

    async setFeeProtocol(web3, contract, historical_block, body) {
        var i = null;
        const data_events = await contract.getPastEvents("SetFeeProtocol", { fromBlock: historical_block, toBlock: 'latest' });
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
                rawTopics: JSON.stringify(data_events[i].raw.topics) ? JSON.stringify(data_events[i].raw.topics) : null,
                poolPair: body.poolPair
            }
            await this.poolActivityService.createPost(poolActivity);
        }
    };
}