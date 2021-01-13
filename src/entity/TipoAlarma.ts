import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TipoAlarma {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipoAlarma: string;

    @Column()
    activo: number;


}
