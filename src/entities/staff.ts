import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { BaseEntity } from "./baseEntity";

@Entity()
export class Staff extends BaseEntity{
 
   @Column({ unique: true })
   username: string;
 
   @Column()
   password: string;

   @Column()
   avatar: string
 
   @Column({ nullable: true })
   fullName: string;

   @Column()
   phone: string;

   @Column()
   email: string;

   @Column({ default: true })
   isActive: boolean;

}
