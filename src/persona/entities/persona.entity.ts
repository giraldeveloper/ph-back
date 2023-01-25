import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, Index } from 'typeorm';


export enum ETipoIdentificacion {
    REGISTRO_CIVIL = 'RC',
    TARJETA_IDENTIDAD = 'TI',
    CEDULA = 'CC',
    CEDULA_EXTRANJERIA = 'CE',
    PASAPORTE = 'PA',
    VISA = 'VI',
    NIT = 'NIT',
}

export enum ETipoPersona {
    NATURAL = 'natural',
    JURIDICA = 'juridica',
}

@Entity("persona")
@Index("persona_identificacion_idx", ["tipoIdentificacion", "numeroIdentificacion"], { unique: true})
export class Persona extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'enum', enum: ETipoIdentificacion, default: ETipoIdentificacion.CEDULA, name: "tipo_identificacion" })
    tipoIdentificacion: ETipoIdentificacion;

    @Column({ length: 45, name: "numero_identificacion" })
    numeroIdentificacion: string;

    @Column({ length: 45, name: "primer_apellido", nullable: true })
    primerApellido: string;

    @Column({ length: 45, name: "segundo_apellido", nullable: true })
    segundoApellido: string;

    @Column({ length: 45, name: "primer_nombre", nullable: true })
    primerNombre: string;

    @Column({ length: 45, name: "segundo_nombre", nullable: true })
    segundoNombre: string;

    @Column({ length: 100, name: "razon_social", nullable: true })
    razonSocial: string;

    @Column({ length: 100, name: "nombre_comercial", nullable: true })
    nombreComercial: string;

    @Column({ type: 'enum', enum: ETipoPersona, default: ETipoPersona.NATURAL, name: "tipo_persona" })
    tipoPersona: ETipoPersona;

    @Column({ name: "fecha_nacimiento" })
    fechaNacimiento: Date;

    @Column({ default: true })
    activo: boolean;

    @Column({ length: 45, name: "usuario_sistema", nullable: true })
    usuarioSistema: string;

    @CreateDateColumn({ name: "fecha_creacion" })
    fechaCreacion: Date; // Creation date

    @UpdateDateColumn({ name: "fecha_modificacion" })
    fechaModificacion: Date; // Last updated date
}
