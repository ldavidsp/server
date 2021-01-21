import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Length } from "class-validator";
import { Linea } from './Linea';

@Entity()
export class Jaula{

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
  	NOMBRE: string;

    @Column()
    PESOPROMEDIO: number; 

    @Column()
    CANTIDADPECES: number; 

    @Column()
    POSICIONSELECTORA: number; 

    @Column()
    PRIORIDAD: number; 

    @Column()
    TASA: number; 

    @Column()
    FACTORACTIVIDAD: number; 

    @Column()
    TIPOTASA: number; 

    @Column()
    TIEMPOSOPLADO: number; 

    @Column()
    HZSOPLADOR: number; 

    @Column()
    HABILITADA: number; 

    @Column()
    IDDOCIFICADOR: number; 

    @Column()
    IDPROGRAMACION: number; 

    @Column()
    IDSELECTORA: number; 

    // @ManyToOne(type => Linea, linea => linea.jaula)
    // idLinea: Linea; 
    @Column()
    IDLINEA: number; 

    @Column()
    TIEMPOESPERA: number; 

    @Column()
    MONORRACION: number; 

}