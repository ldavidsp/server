import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sistema {

    @PrimaryGeneratedColumn()
    idSistema: number;

    @Column()
    centro: string;

    @Column()
    ponton: string;

    @Column()
    macplc: string;

    @Column()
    estado: number;

    @Column()
    ipplc: string;

    @Column()
    tema: number;

    @Column()
    clienteConectado: number;

    @Column()
    servidorConectado: number;

    @Column()
    plcConectado: number;

    @Column()
    contadorReset: number;


}
