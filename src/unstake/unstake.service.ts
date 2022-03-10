import { Injectable } from '@nestjs/common';

@Injectable()
export class UnstakeService {
  getHello(): string {
    return 'Hello World from Unstake!';
  }
}
