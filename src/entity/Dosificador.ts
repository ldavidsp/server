import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Dosificador {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    PRIORIDAD: number;

    @Column()
    MODELOREDUCTOR: string;

    @Column()
    DIRECCIONMODBUS: number;

    @Column()
    TASAMAX: number;

    @Column()
    IDSILO: number;

    @Column()
    IDLINEA: number;

    @Column()
    IDALARMA: number;

}

@Entity()
export class Historicodosificador {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDDOSIFICADOR: number;

    @Column()
    USUARIO: number;

}


