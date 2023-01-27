import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity("inmueble_apoderado")
export class InmuebleApoderado extends CommonBaseEntityAudit {

    @PrimaryColumn({ length: 36, name: "inmueble", nullable: false })
    inmueble: string;

    @PrimaryColumn({ length: 36, name: "apoderado", nullable: false })
    apoderado: string;

    @Column({ name: "fecha_desde" })
    fechaDesde: Date;

    @Column({ name: "fecha_hasta" })
    fechaHasta: Date;

    @Column({ default: true })
    activo: boolean;

}
