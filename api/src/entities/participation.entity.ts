import { Entity, Column, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { BaseEntity } from "./base.entity";

@Entity()
export class Participation extends BaseEntity {

    @Column()
    clientAddress!: string;

    @Column()
    nftAddress!: string;

    @Column()
    faceNumber!: number;

    @Column()
    image_url!: string;

    @ManyToOne(() => Product, product => product.addressParticipations)
    product!: Product;
}