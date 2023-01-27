import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Index } from 'typeorm';

export enum ETipoVehiculo {
    MOTOCICLETA = 'motocicleta',
    CARRO = 'carro',
}

@Entity("vehiculo")
@Index("vehiculo_idx", ["id"], { unique: true})
export class Vehiculo extends BaseEntity{
    
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

    @Column({ length: 45, name: "usuario_sistema", nullable: true })
    usuarioSistema: string;

    @CreateDateColumn({ name: "fecha_creacion" })
    fechaCreacion: Date; // Creation date

    @UpdateDateColumn({ name: "fecha_modificacion" })
    fechaModificacion: Date; // Last updated date

}
