import { abi as RADI_ABI } from '@rytell/tokens/artifacts/contracts/Radi.sol/Radi.json';
import { RADI } from 'src/constants/constants';

export async function getRadiContract() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Web3 = require('web3');
    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            'https://speedy-nodes-nyc.moralis.io/47081753cf11c09387130dee/avalanche/testnet',
        ),
    );

    const radiContract = new web3.eth.Contract(
        RADI_ABI,
        RADI[process.env.CHAIN || 43113].address,
    );

    return radiContract;
}

export function web3Utils() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Web3 = require('web3');
    return Web3.utils;
}
