import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @CreateDateColumn({ type: 'timestamp' }) // Ajouter le type de colonne pour la compatibilité avec PostgreSQL
    createdAt!: Date;

    @Column()
    updatedAt?: Date;

    @Column()
    createdBy!: string;

    @Column()
    updatedBy?: string;
}