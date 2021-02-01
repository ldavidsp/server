import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sistema {

    @PrimaryGeneratedColumn()
    IDSISTEMA: number;

    @Column("varchar", { length: 150 })
    CENTRO: string;

    @Column("varchar", { length: 150 })
    PONTON: string;

    @Column("varchar", { length: 150 })
    MACPLC: string;

    @Column()
    ESTADO: number;

    @Column("varchar", { length: 150 })
    IPPLC: string;

    @Column()
    TEMA: number;

    @Column()
    CLIENTECONECTADO: number;

    @Column()
    SERVIDORCONECTADO: number;

    @Column()
    PLCCONECTADO: number;

    @Column()
    CONTADORRESET: number;


}
