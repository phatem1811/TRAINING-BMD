import { DataSource } from "typeorm";
import { envConfig } from "./envConfig";
import { User } from "../entities/user";

export const AppDataSource = new DataSource({
  type: envConfig.DB_TYPE as any,      
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT as number,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASS,
  database: envConfig.DB_NAME,
  entities: [User],
  // migrations: ["src/migrations/*.ts"],
  logging: ["error"],
  synchronize: true, 
});
