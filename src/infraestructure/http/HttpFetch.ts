/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { IFetch } from './domain/Fetch'
import responseLogger from './response-logger-interceptor'

export class HttpFetch implements IFetch {
  protected instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.SWAPI_URL,
      timeout: 1000,
    })
    this.instance.interceptors.response.use(...responseLogger)
  }

  async get<Response>(url: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<Response>> {
    return this.instance.get(url, config)
  }

  async post<Response>(url: string, data: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<Response>> {
    return this.instance.post(url, data, config)
  }

  create(): AxiosInstance {
    return this.instance
  }
}
