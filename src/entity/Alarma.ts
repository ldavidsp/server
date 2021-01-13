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
    id: number;

    @Column()
    idLinea: number;
    
    @Column()
    fecha: Date;

    @Column()
    observacion: string;
    
    @Column()
    idAlarma: number;
    
    @Column()
    usuario: number;



}

