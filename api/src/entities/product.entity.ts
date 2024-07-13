import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";

export enum ProductType {
  CUBE = "cube",
}

@Entity()
export class Product extends BaseEntity {
  @Column()
  address!: string;

  @Column()
  type!: ProductType;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  totalFace!: number;

  @Column()
  status!: boolean;

  @Column()
  locked!: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price!: number;
}