import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, Column, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('inmueble_propietario')
export class InmueblePropietario extends CommonBaseEntityAudit {
  @PrimaryColumn({ length: 36, name: 'inmueble', nullable: false })
  @JoinColumn({ name: 'inmueble' })
  inmuebleId: string;

  @PrimaryColumn({ length: 36, name: 'propietario', nullable: false })
  @JoinColumn({ name: 'propietario' })
  propietarioId: string;

  @Column({ name: 'fecha_desde' })
  fechaDesde: Date;

  @Column({ name: 'fecha_hasta' })
  fechaHasta: Date;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Inmueble, (inmueble) => inmueble.propietarios)
  @JoinColumn({ name: 'inmueble' })
  public inmueble!: Promise<Inmueble>;

  @ManyToOne(() => Persona, (propietario) => propietario.inmueblesPropios, {
    eager: true,
  })
  @JoinColumn({ name: 'propietario' })
  public propietario!: Promise<Persona>;
}
