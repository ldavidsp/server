import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sistema {

    @PrimaryGeneratedColumn()
    IDSISTEMA: number;

    @Column()
    CENTRO: string;

    @Column()
    PONTON: string;

    @Column()
    MACPLC: string;

    @Column()
    ESTADO: number;

    @Column()
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
