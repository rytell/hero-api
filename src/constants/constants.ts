import { ChainId } from '@rytell/sdk';

export const RPC_URL = {
  [ChainId.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc',
  [ChainId.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
};

export const STAKING_HERO = {
  [ChainId.FUJI]: '0xf776AC03A70F8bD499F1CA6786Ec57e730401E0F',
  [ChainId.AVALANCHE]: '',
};
