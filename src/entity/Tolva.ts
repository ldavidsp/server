import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tolva {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
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

    @Column("varchar", { length: 150 })
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDTOLVA: number;

    @Column()
    USUARIO: number;

}
