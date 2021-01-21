import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Alimentacion {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    VISITAACTUAL: number;

    @Column()
    TOTALVISITAS: number;

    @Column()
    IDJAULA: number;

    @Column()
    IDLINEA: number;

    @Column()
    ENTREGADOVISIT: number;

    @Column()
    OBJETIVOVISITA: number;

    @Column()
    TOTALENTREGADO: number;

    @Column()
    OBJETIVOTOTAL: number;

    @Column()
    HZDOSER: number;

    @Column()
    VISITASCOMPLETADAS: number;

    @Column()
    ESTADOALIMENTACIONS: string;

    @Column()
    FINALIZADA: number;

}

@Entity()
export class Alimentacionhistorica {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    IDJAULA: number;
    
    @Column()
    IDDOSIFICADOR: number;

    @Column()
    CANTIDADKG: number;

    @Column()
    VISITA: number;

    @Column()
    TASA: number;

    @Column()
    FECHA: Date;

    @Column()
    USUARIO: number;


}

