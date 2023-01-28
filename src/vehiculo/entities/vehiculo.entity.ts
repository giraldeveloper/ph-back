import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Index } from 'typeorm';
import { ETipoVehiculo } from 'src/common/enums/ETipoVehiculo';
import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';


@Entity("vehiculo")
@Index("vehiculo_idx", ["id"], { unique: true})
export class Vehiculo extends CommonBaseEntityAudit {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'enum', enum: ETipoVehiculo, default: ETipoVehiculo.CARRO, name: "tipo" })
    tipoVehiculo: ETipoVehiculo;

    @Column({ length: 45, name: "placa", nullable: false })
    placa: string;

    @Column({ length: 45, name: "color", nullable: true })
    color: string;

    @Column({ default: true })
    activo: boolean;

}
