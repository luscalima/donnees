import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { ProjectModel } from './models'

const config = useRuntimeConfig()
const ssl =
  process.env.NODE_ENV === 'development'
    ? false
    : {
        ca: await useStorage('assets:certs').getItem('us-east-2-bundle.pem'),
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
  // @ts-expect-error the returned type is a valid option
  ssl,
})
