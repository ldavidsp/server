import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Guillotina {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    MODELO: string;

    @Column()
    IDSILO: number;

}

@Entity()
export class Historicoguillotina {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDGUILLOTINA: number;

    @Column()
    USUARIO: number;

}

