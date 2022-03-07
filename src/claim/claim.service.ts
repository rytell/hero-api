import { Injectable } from '@nestjs/common';

@Injectable()
export class ClaimService {
    getHello(): string {
        return 'Hello World from Claim!';
      }
}
