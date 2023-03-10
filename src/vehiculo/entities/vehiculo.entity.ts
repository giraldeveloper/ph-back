import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ETipoVehiculo } from 'src/common/enums/ETipoVehiculo';
import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Inmueble } from 'src/inmueble/entities/inmueble.entity';

@Entity('vehiculo')
@Index('vehiculo_idx', ['placa'], { unique: true })
export class Vehiculo extends CommonBaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ETipoVehiculo,
    default: ETipoVehiculo.CARRO,
    name: 'tipo',
  })
  tipoVehiculo: ETipoVehiculo;

  @Column({ length: 45, name: 'placa', nullable: false })
  placa: string;

  @Column({ length: 45, name: 'color', nullable: true })
  color: string;

  @Column({ default: true })
  activo: boolean;

  @Column({ length: 36, name: 'inmueble', nullable: false })
  @JoinColumn({ name: 'inmueble' })
  inmuebleId: string;

  @ManyToOne(() => Inmueble, inmueble => inmueble.vehiculos)
  @JoinColumn({ name: 'inmueble' })
  public inmueble?: Promise<Inmueble>;
}
