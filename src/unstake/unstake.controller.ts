import { Controller, Get } from '@nestjs/common';
import { UnstakeService } from './unstake.service';

@Controller('unstake')
export class UnstakeController {
  constructor(private readonly unstakeService: UnstakeService) {}

  @Get()
  getHello(): string {
    return this.unstakeService.getHello();
  }
}
