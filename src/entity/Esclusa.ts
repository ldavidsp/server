import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Esclusa {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    MODELO: string;

    @Column()
    IDLINEA: number;

    @Column()
    IDALARMA: number;


}
