import "reflect-metadata";
import { DataSource } from "typeorm";
import { Project, Model } from "../database/entities";

const config = useRuntimeConfig();

export const dataSource = new DataSource({
  type: "postgres",
  host: config.dbHost,
  port: Number(config.dbPort),
  username: config.dbUser,
  password: config.dbPass,
  database: config.dbName,
  entities: [Project, Model],
  migrations: ["server/database/migrations/**/*.ts"],
  migrationsTableName: "migrations",
  synchronize: true,
});
