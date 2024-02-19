import { MysqlSqlRepository } from '@infraestructure/persistence/postgresql/MysqlSqlRepository'

import { SpecieDTO } from '../dto/SpecieDTO'
import { Specie } from './Specie'

export interface SpecieRepository extends MysqlSqlRepository {
  create(specie: Specie): Promise<void>
  all(): Promise<Array<SpecieDTO>>
}
