import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TipoUsuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoUsuario: string;

}
