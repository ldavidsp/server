import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TipoUsuario {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column("varchar", { length: 150 })
    TIPOUSUARIO: string;

}
