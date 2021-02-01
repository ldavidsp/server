import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Jaula } from './Jaula';

@Entity()
export class Linea {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    NOMBRE: string;
    
    @Column()
    ESTADO: number;
    @Column()
    PRESION: number;
    @Column()
    ALARMA: number;
    @Column()
    HZPAUSA: number;
    @Column()
    INDICEJAULA: number;
    @Column()
    MODO: number;
    @Column()
    POSICIONSELECTOR: number;
    @Column()
    IDPROGRAMACION: number;
    @Column()
    IDALARMAPRESION: number;
    @Column()
    FINALIZADA: number;

    // @OneToMany(() => Jaula, jaula => jaula.idLinea)
    // jaula: Jaula[];

}
