import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Length } from "class-validator";

@Entity()
export class Jaula{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
  	nombre: string;

    @Column()
    pesoPromedio: number; 

    @Column()
    cantidadPeces: number; 

    @Column()
    posicionSelectora: number; 

    @Column()
    prioridad: number; 

    @Column()
    tasa: number; 

    @Column()
    factorActividad: number; 

    @Column()
    tipoTasa: number; 

    @Column()
    tiempoSoplado: number; 

    @Column()
    hzSoplador: number; 

    @Column()
    habilitada: number; 

    @Column()
    idDocificador: number; 

    @Column()
    idProgramacion: number; 

    @Column()
    idSelectora: number; 

    @Column()
    idLinea: number; 

    @Column()
    tiempoEspera: number; 

    @Column()
    monorracion: number; 

}