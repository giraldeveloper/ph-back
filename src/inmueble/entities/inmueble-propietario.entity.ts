import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Entity, Column, PrimaryColumn, JoinColumn } from 'typeorm';


@Entity("inmueble_propietario")
export class InmueblePropietario extends CommonBaseEntityAudit {

    @PrimaryColumn({ length: 36, name: "inmueble", nullable: false })
    @JoinColumn({ name: 'inmueble' })
    inmueble: string;

    @PrimaryColumn({ length: 36, name: "propietario", nullable: false })
    @JoinColumn({ name: 'propietario' })
    propietario: string;

    @Column({ name: "fecha_desde" })
    fechaDesde: Date;

    @Column({ name: "fecha_hasta" })
    fechaHasta: Date;

    @Column({ default: true })
    activo: boolean;

}
