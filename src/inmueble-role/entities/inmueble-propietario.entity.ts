import { Entity, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';


@Entity("inmueble_propietario")
export class InmueblePropietario extends BaseEntity{

    @Column({ length: 36, name: "inmueble", nullable: false })
    inmueble: string;
    
    @Column({ length: 36, name: "propietario", nullable: false })
    propietario: string;
    
    @Column({ name: "fecha_desde" })
    fechaDesde: Date;

    @Column({ name: "fecha_hasta" })
    fechaHasta: Date;

    @Column({ default: true })
    activo: boolean;

    @Column({ length: 45, name: "usuario_sistema", nullable: true })
    usuarioSistema: string;

    @CreateDateColumn({ name: "fecha_creacion" })
    fechaCreacion: Date; // Creation date

    @UpdateDateColumn({ name: "fecha_modificacion" })
    fechaModificacion: Date; // Last updated date

}
