import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Calibracion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fecha: Date;

    @Column()
    idDosificador: number;

    @Column()
    usuario: number;

    @Column()
    grs1: number;

    @Column()
    grs2: number;

    @Column()
    grs3: number;


}

@Entity()
export class Controlcalibraciom {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    idDosificador: number;    
    
    @Column()
    idLinea: number;

    @Column()
    prioridad: number;

    @Column()
    calibrando: number;

    @Column()
    hz1: number;

    @Column()
    hz2: number;

    @Column()
    hz3: number;

    @Column()
    seg1: number;

    @Column()
    seg2: number;

    @Column()
    seg3: number;

    @Column()
    grs1: number;

    @Column()
    grs2: number;

    @Column()
    grs3: number;

    @Column()
    orden1: number;

    @Column()
    orden2: number;

    @Column()
    orden3: number;

    @Column()
    ordencalibracion: number;

    @Column()
    tasamax: number;

    @Column()
    activacionblower: number;

    @Column()
    hazblower: number;

    @Column()
    posicionselector: number;

    @Column()
    moverselector: number;

}
