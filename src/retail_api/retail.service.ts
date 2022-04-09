import { Injectable } from '@nestjs/common'
import { CrmType, Order, OrdersFilter, RetailPagination } from './types'
import axios, { AxiosInstance } from 'axios'
import { ConcurrencyManager } from 'axios-concurrency'
import { serialize } from '../tools'
import { plainToClass } from 'class-transformer'
import {environment} from "../environments/environment"

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: `${environment.RETAIL_URL}/api/v5`,
      timeout: 10000,
      headers: {
      },
    })

    this.axios.interceptors.request.use((config) => {
      // console.log(config.url)
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        // console.log("Result:", r.data)
        return r
      },
      (r) => {
        // console.log("Error:", r.response.data)
        return r
      },
    )
  }

  async orders(filter?: OrdersFilter): Promise<[Order[], RetailPagination]> {
    const params = serialize(filter, '')
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)
    const pagination: RetailPagination = resp.data.pagination

    return [orders, pagination]
  }

  async findOrder(id: string): Promise<Order | null> {
    const filter = {filter:{ids:[id]}}
    const params = serialize(filter, '')
    console.log(params)
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders = plainToClass(Order, resp.data.orders as Array<any>)
    console.log(orders[0].id)
    return orders[0]
  }

  async orderStatuses(): Promise<CrmType[]> {
    const crm_type = new CrmType()
    return [crm_type]

  }

  async productStatuses(): Promise<CrmType[]> {
    const crm_type = new CrmType()
    return [crm_type]

  }

  async deliveryTypes(): Promise<CrmType[]> {
    const crm_type = new CrmType()
    return [crm_type]

  }
}
