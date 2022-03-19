import { HeroStakingEvent, STAKING_HERO } from './constants/constants';
import abi from './constants/abis/staking-hero.json';

// TODO: we need to bootstrap from starting block
// TODO: we need to subscribe to new events from last block

const MAX_BLOCKS_BEHIND = 2047;

const subscribeToEvents = (stakeHeroContract, callback, currentBlock) => {
    // StakedHero
    stakeHeroContract.events
        .StakedHero({
            fromBlock: currentBlock - MAX_BLOCKS_BEHIND,
        })
        .on('connected', function (subscriptionId) {
            console.log('Connected: ', subscriptionId);
        })
        .on('data', function (event) {
            callback(event);
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
            fromBlock: 'latest',
        })
        .on('connected', function (subscriptionId) {
            console.log('Connected: ', subscriptionId);
        })
        .on('data', function (event) {
            callback(event);
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

const buildSmartContractSnapshot = (callback) => {
    const contractState = [];
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Web3 = require('web3');
    const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
            'wss://api.avax-test.network/ext/bc/C/ws',
        ),
    );

    const stakeHeroContract = new web3.eth.Contract(
        abi,
        STAKING_HERO[process.env.CHAIN || 43113],
    );

    const updateDbSnapshot = (event: HeroStakingEvent) => {
        contractState.push(event);

        // compare function
        const orderWithBlockNumbers = (
            a: HeroStakingEvent,
            b: HeroStakingEvent,
        ) => {
            return b.blockNumber - a.blockNumber;
        };

        // get only last event triggered for a hero
        const onlyLastState = (event: HeroStakingEvent, index) => {
            const firstHeroIndex = contractState.findIndex(
                (evt: HeroStakingEvent) =>
                    evt.returnValues.heroNumber ===
                    event.returnValues.heroNumber,
            );

            return firstHeroIndex === index;
        };

        contractState.sort(orderWithBlockNumbers);
        callback(contractState.filter(onlyLastState));
    };

    const currentBlock = web3.eth.getBlockNumber();

    subscribeToEvents(stakeHeroContract, updateDbSnapshot, currentBlock);
};

export const syncDb = () => {
    const updateDb = (contractState: HeroStakingEvent[]) => {
        contractState.map((heroinfo: HeroStakingEvent) => {
            console.log(heroinfo);
            // should call controller update for stake or unstake
        });
    };

    buildSmartContractSnapshot(updateDb);
};
