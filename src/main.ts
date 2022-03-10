import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { STAKING_HERO } from './constants/constants';
import abi from './constants/abis/staking-hero.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  dotenv.config();
  await app.listen(3000);

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

  // ReceivedERC721
  // UnstakedHero

  // StakedHero
  stakeHeroContract.events
    .StakedHero(
      {
        fromBlock: 7091214,
      },
      function (error, event) {
        console.log('event: ', event);
      },
    )
    .on('connected', function (subscriptionId) {
      console.log('connected: ', subscriptionId);
    })
    .on('data', function (event) {
      console.log('data: ', event); // same results as the optional callback above
    })
    .on('changed', function (event) {
      // remove event from local database
      console.log('changed: ', event);
    })
    .on('error', function (error, receipt) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log('error: ', error);
    });
}
bootstrap();
