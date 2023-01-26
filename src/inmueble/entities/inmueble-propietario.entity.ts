import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Inmueble } from 'src/inmueble/entities/inmueble.entity';
import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';


@Entity("inmueble_propietario")
export class InmueblePropietario extends CommonBaseEntityAudit{


    @ManyToOne(type => Inmueble, inmueble => inmueble.inmueblePropietarios)
    @PrimaryColumn({ length: 36, name: "inmueble", nullable: false })
    inmueble: string;
    
    @ManyToOne(type => Persona, persona => persona.inmueblePropietarios)
    @PrimaryColumn({ length: 36, name: "propietario", nullable: false })
    propietario: string;
    
    @Column({ name: "fecha_desde" })
    fechaDesde: Date;

    @Column({ name: "fecha_hasta" })
    fechaHasta: Date;

    @Column({ default: true })
    activo: boolean;

}
