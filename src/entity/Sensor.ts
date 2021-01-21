import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sensor {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    ALARMA: number;

    @Column()
    NOMBRE: string;


}
