import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';
import * as fs from 'fs';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  async onModuleInit() {
    const schema = fs.readFileSync('src/database/schema.sql', 'utf-8');
    await this.pool.query(schema);
  }

  async query<T = any>(query: string, params?: any[]): Promise<T[]> {
    try {
      const result = await this.pool.query(query, params);
      return result.rows as T[];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Database query failed: ${error.message}`);
      }
      throw error;
    }
  }
}
