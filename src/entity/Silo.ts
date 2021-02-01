import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Silo {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    NOMBRE: string;

    @Column()
    CAPACIDAD: number;

    @Column()
    MEDICADO: number;

    @Column()
    SALDO: number;

    @Column()
    PELLETKILO: number;

    @Column("varchar", { length: 150 })
    ALIMENTO: string;


}

@Entity()
export class Silohistorico {

    @PrimaryGeneratedColumn()
    ID: number;
    
    @Column()
    SALDOANTERIOR: number;

    @Column()
    MOVIMIENTO: number;

    @Column()
    SALDOACTUAL: number;
    
    @Column("varchar", { length: 150 })
    OBSERVACION: string;

    @Column()
    FECHA: Date;

    @Column()
    IDSILO: number;

    @Column()
    IDUSUARIO: number;








}
