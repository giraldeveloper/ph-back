import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { InmueblePropietario } from 'src/inmueble/entities/inmueble-propietario.entity';
import { Entity, Column, PrimaryGeneratedColumn, Index, OneToMany } from 'typeorm';
import { InmuebleApoderado } from './inmueble-apoderado.entity';
import { InmuebleResidente } from './inmueble-residente.entity';

@Entity("inmueble")
@Index("inmueble_numero_idx", ["bloque", "numero"], { unique: true})
export class Inmueble extends CommonBaseEntityAudit {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 45 })
    bloque: string;

    @Column({ length: 45 })
    numero: string;

    @Column({ length: 45 })
    tipo: string;

    @Column({ default: true })
    activo: boolean;


    @OneToMany(type => InmueblePropietario, inmueblePropietario => inmueblePropietario.inmueble)
    inmueblePropietarios: InmueblePropietario[];

    @OneToMany(type => InmuebleApoderado, inmuebleApoderado => inmuebleApoderado.inmueble)
    inmuebleApoderados: InmuebleApoderado[];

    @OneToMany(type => InmuebleResidente, inmuebleResidente => inmuebleResidente.inmueble)
    inmuebleResidentes: InmuebleResidente[];

}
