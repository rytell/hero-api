import { ChainId } from '@rytell/sdk';

export interface HeroContract {
  staked: boolean;
  lastStaked: string;
  lastUnstaked: string;
  heroId: string;
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
  [ChainId.FUJI]: '0xf776AC03A70F8bD499F1CA6786Ec57e730401E0F',
  [ChainId.AVALANCHE]: '',
};
