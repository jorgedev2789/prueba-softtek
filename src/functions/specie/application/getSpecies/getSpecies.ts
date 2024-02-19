import { SpeciePostgreRepository } from '@functions/specie/persistence/SpeciePostgreRepository'
import { logger } from '@libs/powertools'

export class GetSpecie {
  constructor(private repository: SpeciePostgreRepository) {}

  async exec() {
    try {
      return await this.repository.all()
    } catch (error) {
      logger.info('ERROR', error)
      throw new Error(error.message)
    }
  }
}
