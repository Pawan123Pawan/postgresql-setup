import { Global, Module } from '@nestjs/common';
import { Pool, PoolConfig } from 'pg';
import { DatabaseService } from './database.service';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useFactory: (): Pool => {
        const config: PoolConfig = {
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: 'pawan1234',
          database: 'my_database',
        };

        return new Pool(config);
      },
    },
    DatabaseService,
  ],
  exports: ['PG_POOL', DatabaseService],
})
export class DatabaseModule {}
