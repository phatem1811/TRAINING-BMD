import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { Order } from "./order";
import { Product } from "./product";
import {  SharedEntity } from "./baseEntity";

@Entity()
export class OrderItem extends SharedEntity {
  @Column({default: 0})
  price: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product)
  product: Product;
}
