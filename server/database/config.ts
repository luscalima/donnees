import 'reflect-metadata'
import { DataSource } from 'typeorm'

const config = useRuntimeConfig()

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: ['./models/**/*.ts'],
  migrations: ['./migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: true,
})
