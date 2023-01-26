import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity("inmueble_propietario")
export class InmueblePropietario extends CommonBaseEntityAudit{

    @PrimaryColumn({ length: 36, name: "inmueble", nullable: false })
    inmueble: string;
    
    @PrimaryColumn({ length: 36, name: "propietario", nullable: false })
    propietario: string;
    
    @Column({ name: "fecha_desde" })
    fechaDesde: Date;

    @Column({ name: "fecha_hasta" })
    fechaHasta: Date;

    @Column({ default: true })
    activo: boolean;

}
