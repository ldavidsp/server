import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Guillotina {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    modelo: string;

    @Column()
    idSilo: number;

}
