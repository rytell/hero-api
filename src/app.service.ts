import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  getAccountFromAPI(): string {
    const snowtraceAPIBaseUrl = process.env.SNOWTRACEBASEURL;
    this.httpService
      .get(
        `${snowtraceAPIBaseUrl}/api?module=account&action=txlist&address=0xCd8345b1f1a0B86EE3F9706b1bF31DA7850b8fDF&startblock=1&endblock=99999999&sort=asc`,
      )
      .subscribe((resp) => {
        console.log(resp);
      });

    return snowtraceAPIBaseUrl;
  }
}
