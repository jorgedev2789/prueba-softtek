import { Pool } from 'mysql2/typings/mysql/lib/Pool'

import { ISpecieProps, Specie } from '@functions/specie/domain/Specie'
import { MysqlSqlRepository } from '@infraestructure/persistence/postgresql/MysqlSqlRepository'
import { logger } from '@libs/powertools'

import { SpecieRepository } from '../domain/SpecieRepository'
import { SpecieDTO } from '../dto/SpecieDTO'

export class SpeciePostgreRepository extends MysqlSqlRepository implements SpecieRepository {
  constructor(protected readonly clientDB: Pool) {
    super(clientDB)
    this.setTable('species')
  }

  async create({ props, uuid, createdAt, updatedAt }: Specie): Promise<void> {
    try {
      await this.saveQuery<SpecieDTO>({
        uuid,
        nombre: props.nombre,
        clasificacion: props.clasificacion,
        designacion: props.designacion,
        alturaPromedio: props.alturaPromedio,
        colorPiel: props.colorPiel,
        colorPelo: props.colorPelo,
        colorOjos: props.colorOjos,
        promedioVida: props.promedioVida,
        habitad: props.habitad,
        idioma: props.idioma,
        url: props.url,
        createdAt: createdAt,
        updatedAt: updatedAt,
      })
    } catch (error) {
      logger.error('ERROR', error)
      throw error
    }
  }

  async all(): Promise<ISpecieProps[]> {
    try {
      const rows = await this.findAll<SpecieDTO[]>()
      return rows
    } catch (error) {
      logger.error('ERROR', error)
      throw error
    }
  }
}
