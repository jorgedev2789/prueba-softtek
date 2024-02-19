import { Specie } from '@functions/specie/domain/Specie'
import { SpecieRepository } from '@functions/specie/domain/SpecieRepository'
import { SpeciesRequest } from '@functions/specie/domain/SpecieRequest'
import { logger } from '@libs/powertools'

export class SaveSpecie {
  constructor(private repository: SpecieRepository) {}

  async execute(specieRequest: SpeciesRequest) {
    try {
      if (!specieRequest?.nombre) {
        throw new Error('El nombre es obligatorio')
      }

      const SpecieCreate = Specie.create({
        nombre: specieRequest.nombre,
        clasificacion: specieRequest.clasificacion,
        designacion: specieRequest.designacion,
        alturaPromedio: specieRequest.altura_promedio,
        colorPiel: specieRequest.color_piel,
        colorPelo: specieRequest.color_pelo,
        colorOjos: specieRequest.color_ojos,
        promedioVida: specieRequest.promedio_vida,
        habitad: specieRequest.habitad,
        idioma: specieRequest.idioma,
        url: specieRequest.url,
      })

      await this.repository.create(SpecieCreate)
    } catch (error) {
      logger.info('ERROR', error)
      throw error
    }
  }
}
