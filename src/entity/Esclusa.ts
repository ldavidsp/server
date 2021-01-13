import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Esclusa {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    idLinea: number;

    @Column()
    idAlarma: number;


}
