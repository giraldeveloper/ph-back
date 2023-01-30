import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { ETipoIdentificacion } from 'src/common/enums/ETipoIdentificacion';
import { ETipoPersona } from 'src/common/enums/ETipoPersona';
import { InmuebleApoderado } from 'src/inmueble/entities/inmueble-apoderado.entity';
import { InmueblePropietario } from 'src/inmueble/entities/inmueble-propietario.entity';
import { InmuebleResidente } from 'src/inmueble/entities/inmueble-residente.entity';
import { Contacto } from '../../contacto/entities/contacto.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';

@Entity('persona')
@Index(
  'persona_identificacion_idx',
  ['tipoIdentificacion', 'numeroIdentificacion'],
  { unique: true },
)
export class Persona extends CommonBaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ETipoIdentificacion,
    default: ETipoIdentificacion.CEDULA,
    name: 'tipo_identificacion',
  })
  tipoIdentificacion: ETipoIdentificacion;

  @Column({ length: 45, name: 'numero_identificacion' })
  numeroIdentificacion: string;

  @Column({ length: 45, name: 'primer_apellido', nullable: true })
  primerApellido: string;

  @Column({ length: 45, name: 'segundo_apellido', nullable: true })
  segundoApellido: string;

  @Column({ length: 45, name: 'primer_nombre', nullable: true })
  primerNombre: string;

  @Column({ length: 45, name: 'segundo_nombre', nullable: true })
  segundoNombre: string;

  @Column({ length: 100, name: 'razon_social', nullable: true })
  razonSocial: string;

  @Column({ length: 100, name: 'nombre_comercial', nullable: true })
  nombreComercial: string;

  @Column({
    type: 'enum',
    enum: ETipoPersona,
    default: ETipoPersona.NATURAL,
    name: 'tipo_persona',
  })
  tipoPersona: ETipoPersona;

  @Column({ name: 'fecha_nacimiento' })
  fechaNacimiento: Date;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(
    () => InmueblePropietario,
    imbueblePropietario => imbueblePropietario.propietario,
  )
  public inmueblesPropios!: Promise<InmueblePropietario[]>;

  @OneToMany(
    () => InmuebleApoderado,
    inmuebleApoderado => inmuebleApoderado.apoderado,
  )
  public inmueblesApoderados!: Promise<InmuebleApoderado[]>;

  @OneToMany(
    () => InmuebleResidente,
    inmuebleResidente => inmuebleResidente.residente,
  )
  public inmueblesResidentes!: Promise<InmuebleResidente[]>;

  @OneToMany(() => Contacto, contacto => contacto.persona) // { eager: true, }
  public contactos?: Promise<Contacto[]>;
}
