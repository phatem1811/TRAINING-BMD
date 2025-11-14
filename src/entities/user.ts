import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Order } from "./order";
import { SharedEntity } from "./baseEntity";

@Entity()
export class User extends SharedEntity {

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

}
