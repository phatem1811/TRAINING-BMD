import { DataSource } from "typeorm";
import { envConfig } from "./envConfig";
import { User } from "../entities/user";
import { Product } from "../entities/product";
import { Category } from "../entities/category";
import { Staff } from "../entities/staff";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/orderItem";

export const AppDataSource = new DataSource({
  type: envConfig.DB_TYPE as any,      
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT as number,
  username: envConfig.DB_USER,
  password: envConfig.DB_PASS,
  database: envConfig.DB_NAME,
  entities: [User, Product, Category, Staff, Order, OrderItem],
  // migrations: ["src/migrations/*.ts"],
  logging: ["error"],
  synchronize: true, 
});
