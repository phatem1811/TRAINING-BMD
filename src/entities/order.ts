import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { User } from "./user";
import { OrderItem } from "./orderItem";
import { extend } from "dayjs";
import { SharedEntity } from "./baseEntity";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  SHIPPING = "shipping",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
  REFUND = "refund",
}
export enum PaymentMethod {
  COD = "cod",             
  BANK_TRANSFER = "bank_transfer",
}

@Entity()
export class Order extends SharedEntity {

  @Column()
  address: string;

  @Column()
  note: string

  @Column()
  totalAmount: number

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: "enum", enum: PaymentStatus, default: PaymentStatus.UNPAID })
  paymentStatus: PaymentStatus;

  @Column({ type: "enum", enum: PaymentMethod, default: PaymentMethod.COD })
  PaymentMethod: PaymentMethod;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (OrderItem) => OrderItem.order)
  orderItems: OrderItem[];
}
