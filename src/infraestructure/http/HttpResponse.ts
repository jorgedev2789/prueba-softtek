export enum HTTP_CODES {
  'OK' = '200',
  'BAD_REQUEST' = '400',
  'UNAUTHORIZED' = '401',
  'FORBIDDEN' = '403',
  'NOT_FOUND' = '404',
  'INTERNAL_SERVER' = '500',
}

export type ERROR_RESPONSE = {
  message: string
  errorCode?: HTTP_CODES
}

const swapped = () => {
  const swap = Object.entries(HTTP_CODES).map(([key, value]) => [value, key])
  return Object.fromEntries(swap)
}

export class HttpResponse {
  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static ok(body?: Record<any, any> | any) {
    return {
      statusCode: HTTP_CODES.OK,
      body: JSON.stringify(body || swapped[HTTP_CODES.OK]),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }

  static error({ message, errorCode }: ERROR_RESPONSE) {
    return {
      statusCode: errorCode || HTTP_CODES.INTERNAL_SERVER,
      body: JSON.stringify(message || swapped[HTTP_CODES.INTERNAL_SERVER]),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    }
  }
}
