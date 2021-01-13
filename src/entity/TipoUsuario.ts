import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TypoUsuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoUsuario: string;

}
