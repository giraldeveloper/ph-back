import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Persona } from 'src/persona/entities/persona.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Inmueble } from './inmueble.entity';

@Entity('inmueble_apoderado')
export class InmuebleApoderado extends CommonBaseEntityAudit {
  @PrimaryColumn({ length: 36, name: 'inmueble', nullable: false })
  inmuebleId: string;

  @PrimaryColumn({ length: 36, name: 'apoderado', nullable: false })
  apoderadoId: string;

  @Column({ name: 'fecha_desde' })
  fechaDesde: Date;

  @Column({ name: 'fecha_hasta' })
  fechaHasta: Date;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Inmueble, inmueble => inmueble.apoderados)
  @JoinColumn({ name: 'inmueble' })
  public inmueble!: Promise<Inmueble>;

  @ManyToOne(() => Persona, apoderado => apoderado.inmueblesApoderados, {
    eager: true,
  })
  @JoinColumn({ name: 'apoderado' })
  public apoderado!: Promise<Persona>;
}
