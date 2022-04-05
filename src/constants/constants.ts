import { ChainId } from '@rytell/sdk';

export interface Block {
    number: number;
    hash: string;
    parentHash: string;
    nonce: string;
    sha3Uncles: string;
    logsBloom: string;
    transactionsRoot: string;
    stateRoot: string;
    miner: string;
    difficulty: string;
    totalDifficulty: string;
    size: number;
    extraData: string;
    gasLimit: number;
    gasUsed: number;
    timestamp: number;
    transactions: string[];
    uncles: [];
}

export interface HeroContract {
    staked: boolean;
    lastStaked: string;
    lastUnstaked: string;
    heroId: string;
    owner: string;
}

export interface HeroStakingEvent {
    address: string;
    blockNumber: number;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    logIndex: number;
    removed: boolean;
    id: string;
    returnValues: {
        '0': string;
        '1': string;
        '2': string;
        who: string;
        heroNumber: string;
        when: string;
    };
    event: string;
    signature: string;
    raw: {
        data: string;
        topics: string[];
    };
}

export const RPC_URL = {
    [ChainId.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc',
    [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
};

export const STAKING_HERO = {
    // [ChainId.FUJI]: '0xf776AC03A70F8bD499F1CA6786Ec57e730401E0F',
    [ChainId.FUJI]: '0xc7bA3f3dC4D0eb18914Ce946e2295bA09c118989',
    [ChainId.AVALANCHE]: '',
};
