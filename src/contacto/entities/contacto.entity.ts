import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { ETipoContacto } from 'src/common/enums/ETipoContacto';
import { Persona } from 'src/persona/entities/persona.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('persona_contacto')
@Index('contacto_idx', ['persona', 'tipoContacto', 'valor'], { unique: true })
export class Contacto extends CommonBaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 36, name: 'persona', nullable: false })
  @JoinColumn({ name: 'persona' })
  personaId: string;

  @Column({
    type: 'enum',
    enum: ETipoContacto,
    name: 'tipo',
  })
  tipoContacto: ETipoContacto;

  @Column({ length: 150, name: 'valor', nullable: false })
  valor: string;

  @Column({ default: true })
  principal: boolean;

  @Column({ default: true })
  activo: boolean;

  @ManyToOne(() => Persona, (persona) => persona.contactos)
  @JoinColumn({ name: 'persona' })
  public persona?: Promise<Persona>;
}
