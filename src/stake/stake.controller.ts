import { Controller, Get } from '@nestjs/common';
import { StakeService } from './stake.service';

@Controller('stake')
export class StakeController {
    constructor(private readonly stakeService: StakeService) {}

    @Get()
    getHello(): string {
        return this.stakeService.getHello();
    }
}
