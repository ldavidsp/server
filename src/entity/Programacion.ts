import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Programacion {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    NOMBRE: string;

    @Column()
    HORAS: number;

    @Column()
    VISITAS: number;

    @Column()
    KILOS: number;

    @Column()
    USUARIO: number;


}
