/* eslint-disable @typescript-eslint/no-explicit-any */
import middy from '@middy/core'
import middyJsonBodyParser from '@middy/http-json-body-parser'

export const middyfy = (handler: any) => {
  return middy(handler).use(middyJsonBodyParser())
}
