import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sensor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    alarma: number;

    @Column()
    nombre: string;


}
