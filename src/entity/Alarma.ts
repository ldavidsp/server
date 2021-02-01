import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Alarma {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    DIRECCIONMODBUS: number;

    @Column()
    IDTIPOALARMA: number;

    @Column()
    ESTADO: number;

    @Column()
    IDLINEA: number;


}

@Entity()
export class Historicoalarma {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    IDLINEA: number;
    
    @Column()
    FECHA: Date;

    @Column("varchar", { length: 150 })
    OBSERVACION: string;
    
    @Column()
    IDALARMA: number;
    
    @Column()
    USUARIO: number;



}

