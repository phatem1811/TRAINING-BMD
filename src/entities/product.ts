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
import { Category } from "./category";
import { BaseEntity } from "./baseEntity";
@Entity()
export class Product extends BaseEntity {

  @Column({ unique: true })
  name: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "categoryId" })
  category: Category;

}
// data nguyen thuy luu default 
// abstract dùng chung
// dât -> relation => func
// isActive xóa mềm
// checkUsser auth

// logger ra file, errorhanlder
// findall, arr
//getByID 