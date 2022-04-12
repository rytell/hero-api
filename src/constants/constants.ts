import { ChainId, Token } from '@rytell/sdk';

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
    [ChainId.AVALANCHE]: '0xE0B05Eb50E8481e1685612cF0a16251Bc2f7A1b4',
};

export const RADI: { [chainId in ChainId]: Token } = {
    [ChainId.FUJI]: new Token(
        ChainId.FUJI,
        // '0x600615234c0a427834A4344D10fEaCA374B2dfCB',
        '0xCcA36c23E977d6c2382dF43e930BC8dE9daC897E',
        18,
        'RADI',
        'RADI',
    ),
    [ChainId.AVALANCHE]: new Token(
        ChainId.AVALANCHE,
        '0x9c5bBb5169B66773167d86818b3e149A4c7e1d1A',
        18,
        'RADI',
        'RADI',
    ),
};
