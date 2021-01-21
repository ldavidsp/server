import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TipoAlarma {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    TIPOALARMA: string;

    @Column()
    ACTIVO: number;


}
