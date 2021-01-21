import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tolva {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    MODELO: string;

    @Column()
    DIRECCIONMODBUS: number;

    @Column()
    IDLINEA: number;

    @Column()
    IDALARMA: number;


}

@Entity()
export class Historicotolva {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDTOLVA: number;

    @Column()
    USUARIO: number;

}
