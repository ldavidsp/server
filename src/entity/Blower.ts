import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Blower {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    potencia: number;

    @Column()
    direccionmodbus: number;

    @Column()
    idLinea: number;

    @Column()
    idAlarma: number;

}

@Entity()
export class Historicoblower {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: string;

    @Column()
    fecha: Date;

    @Column()
    idblower: number;

    @Column()
    idAlarma: number;

}

@Entity()
export class Controlblower {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idblower: number;    
    
    @Column()
    idLinea: number;

    @Column()
    hzblower: number;

    @Column()
    estadoblower: number;

}
