import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Guillotina {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    MODELO: string;

    @Column()
    IDSILO: number;

}
