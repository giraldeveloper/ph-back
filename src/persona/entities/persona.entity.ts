import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { ETipoIdentificacion } from 'src/common/enums/ETipoIdentificacion';
import { ETipoPersona } from 'src/common/enums/ETipoPersona';
import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity("persona")
@Index("persona_identificacion_idx", ["tipoIdentificacion", "numeroIdentificacion"], { unique: true })
export class Persona extends CommonBaseEntityAudit {

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

}
