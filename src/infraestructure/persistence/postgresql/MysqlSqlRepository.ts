/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'mysql2/typings/mysql/lib/Pool'

export class MysqlSqlRepository {
  private table: string

  constructor(private readonly _client: Pool) {}

  setTable(table: string) {
    this.table = table
  }

  getTable() {
    return this.table
  }

  executeQuery<T>(query: string, params?: Partial<T>) {
    return new Promise<T>((resolve, reject) => {
      this._client.query(query, params, (error: any, results: any) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      })
    })
  }

  async findAll<T>(): Promise<T> {
    const query = `SELECT * FROM ${this.getTable()}`
    const results = await this.executeQuery<T>(query)
    return results
  }

  async findById(id: number) {
    const query = `SELECT * FROM ${this.getTable()} WHERE id = ?`
    const results = await this.executeQuery(query, [id])
    return results[0]
  }

  async saveQuery<T>(data: Partial<T>): Promise<void> {
    const query = `INSERT INTO ${this.getTable()} SET ?`
    await this.executeQuery(query, data)
  }

  async updateQuery<T>(id: number, data: Partial<T>) {
    const query = `UPDATE ${this.getTable()} SET ? WHERE id = ?`
    await this.executeQuery(query, [data, id])
  }

  async deleteQuery(id: number) {
    const query = `DELETE FROM ${this.getTable()} WHERE id = ?`
    await this.executeQuery(query, [id])
  }
}
