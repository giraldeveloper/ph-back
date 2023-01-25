import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Index } from 'typeorm';

@Entity("inmueble")
@Index("inmueble_numero_idx", ["bloque", "numero"], { unique: true})
export class Inmueble extends BaseEntity {

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

    @Column({ length: 45, name: "usuario_sistema", nullable: true })
    usuarioSistema: string;

    @CreateDateColumn({ name: "fecha_creacion" })
    fechaCreacion: Date; // Creation date

    @UpdateDateColumn({ name: "fecha_modificacion" })
    fechaModificacion: Date; // Last updated date
}
