import { Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm';

export class CommonBaseEntityAudit extends BaseEntity {

    @Column({ length: 45, name: "usuario_sistema", nullable: true })
    usuarioSistema: string;

    @CreateDateColumn({ name: "fecha_creacion" })
    fechaCreacion: Date; // Creation date

    @UpdateDateColumn({ name: "fecha_modificacion" })
    fechaModificacion: Date; // Last updated date
}