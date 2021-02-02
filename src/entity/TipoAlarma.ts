import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tipoalarma {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    TIPOALARMA: string;

    @Column()
    ACTIVO: number;


}
