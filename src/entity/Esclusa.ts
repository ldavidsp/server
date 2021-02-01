import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Esclusa {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    MODELO: string;

    @Column()
    IDLINEA: number;

    @Column()
    IDALARMA: number;

}

@Entity()
export class Historicoesclusa {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDESCLUSA: number;

    @Column()
    USUARIO: number;

}

