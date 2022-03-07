import { Injectable } from '@nestjs/common';

@Injectable()
export class StakeService {
    getHello(): string {
        return 'Hello World from Stake!';
      }
}
