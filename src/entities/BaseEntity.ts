import { PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, BaseEntity } from "typeorm";


export abstract class SharedEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" })
  createdAt: number;

  @Column({ type: "bigint" })
  updatedAt: number;

  @BeforeInsert()
  setCreateTime() {
    const now = Math.floor(Date.now() / 1000); 
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  setUpdateTime() {
    this.updatedAt = Math.floor(Date.now() / 1000);
  }
}
