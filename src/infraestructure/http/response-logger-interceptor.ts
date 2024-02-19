import type { AxiosResponse } from 'axios'

import { logger } from '@libs/powertools'

const success = (response: AxiosResponse) => {
  const { status, headers, data } = response || { status: 0 }
  logger.info('Received Response: ', {
    status,
    headers,
    data,
  })
  return response
}
const failure = error => {
  const { status, headers, data, config } = error?.response || { status: 0, config: {} }
  const { url } = config
  logger.warn('Received Response Error: ', {
    status,
    url,
    headers,
    data,
  })

  return Promise.reject(error)
}

export default [success, failure]
