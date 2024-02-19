import { HttpFetch } from '@infraestructure/http/HttpFetch'
import { logger } from '@libs/powertools'

export class GetSpecieSwapi {
  constructor(private http: HttpFetch) {}

  async exec() {
    try {
      return await this.http.get('species/')
    } catch (error) {
      logger.info('ERROR', error)
      throw new Error(error.message)
    }
  }
}
