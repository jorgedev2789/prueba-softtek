import { APIGatewayProxyEvent } from 'aws-lambda'

import * as mockSpecies from '@mock/species_swapi.json'

import { GetSpecieSwapi } from './getSpeciesSwapi'
import { getSpecieSwapi } from './handler'

jest.mock('@infraestructure/http/HttpFetch', () => ({
  HttpFetch: jest.fn().mockImplementation(() => ({
    get: jest.fn().mockResolvedValue({ data: mockSpecies }),
  })),
}))

describe('getSpecieSwapi', () => {
  const event: APIGatewayProxyEvent = {
    body: '{"key": "value"}',
    headers: { 'Content-Type': 'application/json' },
    multiValueHeaders: { 'Content-Type': ['application/json'] },
    httpMethod: 'GET',
    path: '/',
    isBase64Encoded: false,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: null,
    resource: '',
  }
  it('should return species data successfully', async () => {
    const response = await getSpecieSwapi(event, null, null)

    expect(response.statusCode).toBe('200')
    expect(response.body).toBe(JSON.stringify(mockSpecies))
  })

  it('should return an error if there is an exception', async () => {
    jest.spyOn(GetSpecieSwapi.prototype, 'exec').mockRejectedValueOnce(new Error('API error'))

    const response = await getSpecieSwapi(event, null, null)

    expect(response.statusCode).toBe('500')
    expect(JSON.parse(response.body)).toEqual('API error')
  })
})
