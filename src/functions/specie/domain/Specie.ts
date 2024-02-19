import uuid4 from 'uuid4'

export interface ISpecieProps {
  uuid?: string
  nombre: string
  clasificacion: string
  designacion: string
  alturaPromedio: string
  colorPiel: string
  colorPelo: string
  colorOjos: string
  promedioVida: string
  habitad: string
  idioma: string
  url: string
  createdAt?: Date
  updatedAt?: Date
}

export class Specie {
  private constructor(
    readonly props: ISpecieProps,
    readonly uuid?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  static create(plainData: ISpecieProps, _uuid?: string): Specie {
    return new Specie(plainData, _uuid ?? uuid4(), new Date(), new Date())
  }

  static toDomain(plainData: ISpecieProps) {
    return new Specie(plainData, plainData.uuid, plainData.createdAt, plainData.updatedAt)
  }
}
