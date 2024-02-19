import { APIGatewayProxyEvent, Handler } from 'aws-lambda'

import { SpeciePostgreRepository } from '@functions/specie/persistence/SpeciePostgreRepository'
import { HttpResponse } from '@infraestructure/http/HttpResponse'
import { MySqlClient } from '@infraestructure/persistence/postgresql/MsqlSqlClientFactory'
import { logger } from '@libs/powertools'
import middyfy from '@middy/core'

import { GetSpecie } from './getSpecies'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSpecie: Handler = async (_event: APIGatewayProxyEvent) => {
  try {
    const clientFactory = await MySqlClient.getInstance().clientDB()
    const controlRepository = new SpeciePostgreRepository(clientFactory)
    const list = new GetSpecie(controlRepository)

    const list_Species = await list.exec()

    return HttpResponse.ok(list_Species)
  } catch (error) {
    logger.error('ERROR', error)
    return HttpResponse.error({ message: error.message, errorCode: error.statusCode })
  }
}

export const main = middyfy(getSpecie)
