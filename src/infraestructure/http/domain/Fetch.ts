/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IFetch {
  get<Response>(url?: string, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<Response>>
  post<Response>(url?: string, data?: any, config?: AxiosRequestConfig<any>): Promise<AxiosResponse<Response>>
  create(): AxiosInstance
}
