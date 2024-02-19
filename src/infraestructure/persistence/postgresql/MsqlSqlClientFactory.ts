import { createPool } from 'mysql2'
import { Pool } from 'mysql2/typings/mysql/lib/Pool'

import { logger } from '@libs/powertools'

export class MySqlClientFactory {
  static async createClient(): Promise<Pool> {
    try {
      const connection = createPool({
        host: process.env.MSQLHOST,
        user: process.env.MSQLUSER,
        password: process.env.MSQLPASSWORD,
        database: process.env.MSQLDATABASE,
      })

      return connection
    } catch (error) {
      logger.info('ERROR CONECTION BD', error)
    }
  }
}

export class MySqlClient {
  private static instance: MySqlClient

  private constructor() {}

  public static getInstance(): MySqlClient {
    if (!MySqlClient.instance) {
      MySqlClient.instance = new MySqlClient()
    }

    return MySqlClient.instance
  }

  async clientDB(): Promise<Pool> {
    return MySqlClientFactory.createClient()
  }
}
