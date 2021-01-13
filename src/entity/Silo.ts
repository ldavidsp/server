import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Silo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    capacidad: number;

    @Column()
    medicado: number;

    @Column()
    saldo: number;

    @Column()
    pelletkilo: number;

    @Column()
    alimento: string;


}
