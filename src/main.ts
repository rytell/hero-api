import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { HeroStakingEvent, STAKING_HERO } from './constants/constants';
import abi from './constants/abis/staking-hero.json';
import fs from 'fs';

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

  const contractState = [];
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
          evt.returnValues.heroNumber === event.returnValues.heroNumber,
      );

      return firstHeroIndex === index;
    };

    contractState.sort(orderWithBlockNumbers);
    const filteredContractState = contractState.filter(onlyLastState);

    // get a local dump for this
    const data = JSON.stringify(filteredContractState, null, 2);
    fs.writeFileSync('currentdbsnap.json', data);
  };

  // StakedHero
  stakeHeroContract.events
    .StakedHero({
      fromBlock: 7091214,
    })
    .on('connected', function (subscriptionId) {
      console.log('Connected: ', subscriptionId);
    })
    .on('data', function (event) {
      updateDbSnapshot(event);
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
      fromBlock: 7091214,
    })
    .on('connected', function (subscriptionId) {
      console.log('Connected: ', subscriptionId);
    })
    .on('data', function (event) {
      updateDbSnapshot(event);
    })
    .on('changed', function (event) {
      // remove event from local database
      console.log('Changed: ', event);
    })
    .on('error', function (error, receipt) {
      // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
      console.log('Error: ', error, 'Receipt: ', receipt);
    });
}
bootstrap();
