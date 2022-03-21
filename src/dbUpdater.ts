import { HeroStakingEvent, STAKING_HERO } from './constants/constants';
import abi from './constants/abis/staking-hero.json';
import { INestApplication } from '@nestjs/common';
import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3');
const web3 = new Web3(
    new Web3.providers.WebsocketProvider(
        'wss://api.avax-test.network/ext/bc/C/ws',
    ),
);

const MAX_BLOCKS_BEHIND = 2045;

const subscribeToEvents = (stakeHeroContract, callback, currentBlock) => {
    // StakedHero
    stakeHeroContract.events
        .StakedHero({
            fromBlock: currentBlock - MAX_BLOCKS_BEHIND,
        })
        .on('connected', function (subscriptionId) {
            console.log('Connected: ', subscriptionId);
        })
        .on('data', async function (event: HeroStakingEvent) {
            callback(event); // async
        })
        .on('changed', function (event) {
            // remove event from local database
            console.log('Changed: ', event);
        })
        .on('error', function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log('Error: ', error, 'Receipt: ', receipt);
        });

    // UnstakedHero
    stakeHeroContract.events
        .UnstakedHero({
            fromBlock: currentBlock - MAX_BLOCKS_BEHIND,
        })
        .on('connected', function (subscriptionId) {
            console.log('Connected: ', subscriptionId);
        })
        .on('data', function (event: HeroStakingEvent) {
            callback(event); //async
        })
        .on('changed', function (event) {
            // remove event from local database
            console.log('Changed: ', event);
        })
        .on('error', function (error, receipt) {
            // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            console.log('Error: ', error, 'Receipt: ', receipt);
        });
};

export const syncDb = async (app: INestApplication) => {
    const updateDb = async (heroinfo: HeroStakingEvent) => {
        // should call controller update for stake or unstake
        await axios.post(`${await app.getUrl()}/hero`, {
            createHeroDto: {
                heroNumber: heroinfo.returnValues.heroNumber,
                blockNumber: heroinfo.returnValues.when,
                staker: heroinfo.returnValues.who,
            },
        });
    };

    const stakeHeroContract = new web3.eth.Contract(
        abi,
        STAKING_HERO[process.env.CHAIN || 43113],
    );

    const currentBlock = await web3.eth.getBlockNumber();

    subscribeToEvents(stakeHeroContract, updateDb, currentBlock);
};
