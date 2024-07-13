import { Entity, Column, OneToMany } from "typeorm";
import { Participation } from "./participation.entity";
import { BaseEntity } from "./base.entity";

export enum ProductType {
  CUBE = "cube",
}

@Entity()
export class Product extends BaseEntity {
  @Column()
  address!: string;

  @OneToMany(() => Participation, (participation) => participation.product)
  addressParticipations!: Participation[];

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