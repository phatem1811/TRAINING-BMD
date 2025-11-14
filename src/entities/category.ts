import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Product } from "./product";
import {  SharedEntity } from "./baseEntity";
@Entity()
export class Category extends SharedEntity {
  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
