import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import {RetailService} from "./retail_api/retail.service"

@Controller()
export class AppController {
  constructor(
      private readonly appService: AppService,
      private retailService: RetailService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get('/testOrder')
  testOrder(): string {
    console.log(this.retailService.orders())
    return 'testOrder'
  }

  @Get('/testFindOrder')
  testFindOrder(): string {
    console.log(this.retailService.findOrder('54'))
    return 'testOrder'
  }

}
