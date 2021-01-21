import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Silo {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    NOMBRE: string;

    @Column()
    CAPACIDAD: number;

    @Column()
    MEDICADO: number;

    @Column()
    SALDO: number;

    @Column()
    PELLETKILO: number;

    @Column()
    ALIMENTO: string;


}
