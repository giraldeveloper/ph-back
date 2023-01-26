import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

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

}
