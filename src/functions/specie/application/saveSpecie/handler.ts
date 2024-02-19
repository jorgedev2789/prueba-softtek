import { APIGatewayProxyEvent, Handler } from 'aws-lambda'

import { SpeciesRequest } from '@functions/specie/domain/SpecieRequest'
import { SpeciePostgreRepository } from '@functions/specie/persistence/SpeciePostgreRepository'
import { HttpResponse } from '@infraestructure/http/HttpResponse'
import { MySqlClient } from '@infraestructure/persistence/postgresql/MsqlSqlClientFactory'
import { parseBody } from '@libs/parseBody'
import { logger } from '@libs/powertools'
import middyfy from '@middy/core'

import { SaveSpecie } from './saveSpecie'

const saveSpecie: Handler = async (_event: APIGatewayProxyEvent) => {
  try {
    logger.info('INFO', _event.body)
    const Specie_data: SpeciesRequest = parseBody(_event.body)
    const clientFactory = await MySqlClient.getInstance().clientDB()
    const SpecieRepository = new SpeciePostgreRepository(clientFactory)
    const create = new SaveSpecie(SpecieRepository)
    await create.execute(Specie_data)

    return HttpResponse.ok({ success: true })
  } catch (error) {
    logger.error('ERROR', error)
    return HttpResponse.error({ message: error.message, errorCode: error.statusCode })
  }
}
export const main = middyfy(saveSpecie)
