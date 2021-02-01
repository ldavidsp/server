import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Blower {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    MODELO: string;

    @Column()
    POTENCIA: number;

    @Column()
    DIRECCIONMODBUS: number;

    @Column()
    IDLINEA: number;

    @Column()
    IDALARMA: number;

}

@Entity()
export class Historicoblower {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDBLOWER: number;

    @Column()
    IDALARMA: number;

}

@Entity()
export class Controlblower {

    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column()
    IDBLOWER: number;    
    
    @Column()
    IDLINEA: number;

    @Column()
    HZBLOWER: number;

    @Column()
    ESTADOBLOWER: number;

}
