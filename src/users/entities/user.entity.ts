import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  Index,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
@Index('user_idx', ['username'], { unique: true })
export class User extends CommonBaseEntityAudit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, name: 'username', nullable: false })
  username: string;

  @Column({ length: 255, name: 'email', nullable: false })
  email: string;

  @Column({ length: 255, name: 'password', nullable: false })
  password: string;

  @Column({ length: 200, name: 'nombre', nullable: false })
  nombre: string;

  @Column({ length: 255, name: 'foto', nullable: true })
  foto: string;

  @Column({ name: 'estado', default: true })
  estado: boolean;

  @Column({ name: 'perfil', nullable: false })
  perfil: number;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
