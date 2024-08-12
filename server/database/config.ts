import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { ProjectModel } from './models'

const config = useRuntimeConfig()

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: [ProjectModel],
  migrations: ['./migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: true,
})
