import { SpeciesRequest } from '@functions/specie/domain/SpecieRequest'
import { SpeciePostgreRepository } from '@functions/specie/persistence/SpeciePostgreRepository'
import { MySqlClient } from '@infraestructure/persistence/postgresql/MsqlSqlClientFactory'

import { SaveSpecie } from './saveSpecie'

jest.mock('@infraestructure/persistence/postgresql/MsqlSqlClientFactory', () => ({
  MySqlClient: {
    getInstance: jest.fn().mockReturnValue({
      clientDB: jest.fn().mockResolvedValue({}), // Mockear el método clientDB que devuelve la conexión a la base de datos
    }),
  },
}))

describe('Test create specie', () => {
  it('validate if the species name comes in the request', async () => {
    const Specie_data: SpeciesRequest = {
      clasificacion: 'mammal',
      designacion: 'sentient',
      altura_promedio: '180',
      color_piel: 'caucasian, black, asian, hispanic',
      color_pelo: 'blonde, brown, black, red',
      color_ojos: 'brown, blue, green, hazel, grey, amber',
      promedio_vida: '120',
      habitad: 'https://swapi.py4e.com/api/planets/9/',
      idioma: 'Galactic Basic',
      url: 'https://swapi.py4e.com/api/species/1/',
    }
    const clientFactory = await MySqlClient.getInstance().clientDB()
    const SpecieRepository = new SpeciePostgreRepository(clientFactory)
    const create = new SaveSpecie(SpecieRepository)
    await expect(create.execute(Specie_data)).rejects.toThrow()
  })
})
