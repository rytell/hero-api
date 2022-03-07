import { Controller, Get } from '@nestjs/common';
import { ClaimService } from './claim.service';

@Controller('claim')
export class ClaimController {
    constructor(private readonly claimService: ClaimService) {}

    @Get()
    getHello(): string {
        return this.claimService.getHello();
    }

}
