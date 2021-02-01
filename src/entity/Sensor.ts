import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Sensor {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    ALARMA: number;

    @Column("varchar", { length: 150 })
    NOMBRE: string;


}
