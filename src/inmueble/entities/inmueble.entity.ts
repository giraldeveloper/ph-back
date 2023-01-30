import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Vehiculo } from 'src/vehiculo/entities/vehiculo.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
} from 'typeorm';
import { InmuebleApoderado } from './inmueble-apoderado.entity';
import { InmueblePropietario } from './inmueble-propietario.entity';
import { InmuebleResidente } from './inmueble-residente.entity';

@Entity('inmueble')
@Index('inmueble_numero_idx', ['bloque', 'numero'], { unique: true })
export class Inmueble extends CommonBaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 45 })
  bloque: string;

  @Column({ length: 45 })
  numero: string;

  @Column({ length: 45 })
  tipo: string;

  @Column({ default: true })
  activo: boolean;

  @OneToMany(
    () => InmueblePropietario,
    (imbueblePropietario) => imbueblePropietario.inmueble,
  )
  public propietarios?: Promise<InmueblePropietario[]>;

  @OneToMany(
    () => InmuebleApoderado,
    (inmuebleApoderado) => inmuebleApoderado.inmueble,
  )
  public apoderados?: Promise<InmuebleApoderado[]>;

  @OneToMany(
    () => InmuebleResidente,
    (inmuebleResidente) => inmuebleResidente.inmueble,
  )
  public residentes?: Promise<InmuebleResidente[]>;

  @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.inmueble) // { eager: true, }
  public vehiculos?: Promise<Vehiculo[]>;
}
