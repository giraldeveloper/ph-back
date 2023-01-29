import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from './inmueble.entity';


@Entity("inmueble_residente")
export class InmuebleResidente extends CommonBaseEntityAudit{


    @PrimaryColumn({ length: 36, name: "inmueble", nullable: false })
    inmuebleId: string;
    
    @PrimaryColumn({ length: 36, name: "residente", nullable: false })
    residenteId: string;
    
    @Column({ name: "fecha_desde" })
    fechaDesde: Date;

    @Column({ name: "fecha_hasta" })
    fechaHasta: Date;

    @Column({ default: true })
    activo: boolean;



    @ManyToOne(() => Inmueble, (inmueble) => inmueble.residentes)
    @JoinColumn({ name: 'inmueble' })
    public inmueble!: Inmueble

    @ManyToOne(() => Persona, (residente) => residente.inmueblesResidentes, { eager: true, })
    @JoinColumn({ name: 'residente' })
    public residente!: Persona

}
