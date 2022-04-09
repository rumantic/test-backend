import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import {RetailService} from "./retail_api/retail.service"
import {Order} from "./retail_api/types"

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
  testFindOrder(): Promise<Order | null> {
    const data = this.retailService.findOrder('54')
    console.log(data)
    return data
  }

}
