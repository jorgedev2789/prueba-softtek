import { APIGatewayProxyEvent, Handler } from 'aws-lambda'

import { HttpFetch } from '@infraestructure/http/HttpFetch'
import { HttpResponse } from '@infraestructure/http/HttpResponse'
import { logger } from '@libs/powertools'
import middyfy from '@middy/core'

import { GetSpecieSwapi } from './getSpeciesSwapi'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getSpecieSwapi: Handler = async (_event: APIGatewayProxyEvent) => {
  try {
    const httClient = new HttpFetch()
    const list = new GetSpecieSwapi(httClient)

    const species_swapi = await list.exec()
    return HttpResponse.ok(species_swapi.data)
  } catch (error) {
    logger.error('ERROR', error)
    return HttpResponse.error({ message: error.message, errorCode: error.statusCode })
  }
}

export const main = middyfy(getSpecieSwapi)
