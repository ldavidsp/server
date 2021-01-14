import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Programacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    horas: number;

    @Column()
    visitas: number;

    @Column()
    usuario: number;


}
