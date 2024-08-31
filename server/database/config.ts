import 'reflect-metadata'
import { readFileSync } from 'fs'
import { DataSource } from 'typeorm'
import { ProjectModel } from './models'

const config = useRuntimeConfig()
const ssl =
  process.env.NODE_ENV === 'production'
    ? {
        ca: readFileSync('./assets/certs/us-east-2-bundle.pem'),
      }
    : {
        rejectUnauthorized: false,
      }

export const dataSource = new DataSource({
  type: 'postgres',
  host: config.dbHost,
  port: +config.dbPort,
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: [ProjectModel],
  migrations: ['./migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: true,
  ssl,
})
