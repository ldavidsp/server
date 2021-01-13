import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Selectora {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    salidas: number;

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
export class Historicoselectora {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: string;

    @Column()
    fecha: Date;

    @Column()
    idSelectora: number;

    @Column()
    usuario: number;

}

@Entity()
export class Controlselector {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idSelector: number;    
    
    @Column()
    idLinea: number;

    @Column()
    posicion_actual: number;

    @Column()
    posicion_deseada: number;

    @Column()
    orden_mover: number;

}
