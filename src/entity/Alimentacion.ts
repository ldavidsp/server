import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Alimentacion {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    visitaActual: number;

    @Column()
    totalVisitas: number;

    @Column()
    idJaula: number;

    @Column()
    idLinea: number;

    @Column()
    entregadoVisit: number;

    @Column()
    objetivoVisita: number;

    @Column()
    totalEntregado: number;

    @Column()
    objetivoTotal: number;

    @Column()
    hzDoser: number;

    @Column()
    visitasCompletadas: number;

    @Column()
    estadoAlimentacions: string;

    @Column()
    finalizada: number;

}

@Entity()
export class Alimentacionhistorica {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idJaula: number;
    
    @Column()
    idDosificador: number;

    @Column()
    cantidadKg: number;

    @Column()
    visita: number;

    @Column()
    tasa: number;

    @Column()
    fecha: Date;

    @Column()
    usuario: number;


}

