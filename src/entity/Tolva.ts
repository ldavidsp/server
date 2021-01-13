import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tolva {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    direccionmodbus: number;

    @Column()
    idLinea: number;

    @Column()
    idAlarma: number;


}

@Entity()
export class Historicotolva {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: string;

    @Column()
    fecha: Date;

    @Column()
    idTolva: number;

    @Column()
    usuario: number;

}
