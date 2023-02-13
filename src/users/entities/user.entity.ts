import { CommonBaseEntityAudit } from 'src/common/entities/CommonBaseEntityAudit';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
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

  @Column({ default: true })
  estado: boolean;

  @Column({ length: 45, name: 'perfil', nullable: false })
  perfil: string;

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
