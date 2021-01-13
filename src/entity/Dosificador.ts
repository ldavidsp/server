import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dosificador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prioridad: number;

    @Column()
    modeloreductor: string;

    @Column()
    direccionmodbus: number;

    @Column()
    tasamax: number;

    @Column()
    idSilo: number;

    @Column()
    idLinea: number;

    @Column()
    idAlarma: number;

}

@Entity()
export class Historicodosificador {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: string;

    @Column()
    fecha: Date;

    @Column()
    idDosificador: number;

    @Column()
    usuario: number;

}


