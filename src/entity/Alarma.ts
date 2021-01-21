import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Alarma {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    direccionmodbus: number;

    @Column()
    idTipoAlarma: number;

    @Column()
    estado: number;

    @Column()
    idLinea: number;


}

@Entity()
export class Historicoalarma {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    IDLINEA: number;
    
    @Column()
    FECHA: Date;

    @Column()
    observacion: string;
    
    @Column()
    IDALARMA: number;
    
    @Column()
    USUARIO: number;



}

