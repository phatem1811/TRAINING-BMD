import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
export enum UserRole {
    ADMIN = "admin",
    CLIENT = "client",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
   id: number;
 
   @Column({ unique: true })
   username: string;
 
   @Column()
   password: string;
 
   @Column({ nullable: true })
   fullName: string;

   @Column()
   phone: string;

   @Column()
   email: string;

   @Column({ default: true })
   isActive: boolean;

   @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.CLIENT,
    })
    role: UserRole
 
   @CreateDateColumn()
   createdAt: Date;
 
   @UpdateDateColumn()
   updatedAt: Date;
}
