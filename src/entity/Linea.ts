import {Column,  PrimaryGeneratedColumn, Entity} from "typeorm";

@Entity()
export class Linea {
    
    @PrimaryGeneratedColumn()
    ID: number;
    @Column()
    nombre: string;
    @Column()
    estado: number;
    @Column()
    presion: number;
    @Column()
    alarma: number;
    @Column()
    hzPausa: number;
    @Column()
    indiceJaula: number;
    @Column()
    modo: number;
    @Column()
    posicionSelector: number;
    @Column()
    idProgramacion: number;
    @Column()
    idAlarmaPresion: number;
    @Column()
    finalizada: number;

}
