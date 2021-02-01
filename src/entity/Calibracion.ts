import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Calibracion {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    FECHA: Date;

    @Column()
    IDDOSIFICADOR: number;

    @Column()
    USUARIO: number;

    @Column()
    GRS1: number;

    @Column()
    GRS2: number;

    @Column()
    GRS3: number;


}

@Entity()
export class Controlcalibracion {

    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column()
    IDDOSIFICADOR: number;    
    
    @Column()
    IDLINEA: number;

    @Column()
    PRIORIDAD: number;

    @Column()
    CALIBRANDO: number;

    @Column()
    HZ1: number;

    @Column()
    HZ2: number;

    @Column()
    HZ3: number;

    @Column()
    SEG1: number;

    @Column()
    SEG2: number;

    @Column()
    SEG3: number;

    @Column()
    GRS1: number;

    @Column()
    GRS2: number;

    @Column()
    GRS3: number;

    @Column()
    ORDEN1: number;

    @Column()
    ORDEN2: number;

    @Column()
    ORDEN3: number;

    @Column()
    ORDENCALIBRACION: number;

    @Column()
    TASAMAX: number;

    @Column()
    ACTIVACIONBLOWER: number;

    @Column()
    HAZBLOWER: number;

    @Column()
    POSICIONSELECTOR: number;

    @Column()
    MOVERSELECTOR: number;

}
