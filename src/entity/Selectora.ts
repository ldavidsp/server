import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from 'class-validator';

@Entity()
export class Selectora {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    SALIDAS: number;

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
export class Historicoselectora {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDSELECTORA: number;

    @Column()
    USUARIO: number;

}

@Entity()
export class Controlselector {

    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column()
    IDSELECTOR: number;    
    
    @Column()
    IDLINEA: number;

    @Column()
    POSICION_ACTUAL: number;

    @Column()
    POSICION_DESEADA: number;

    @Column()
    ORDEN_MOVER: number;

}
