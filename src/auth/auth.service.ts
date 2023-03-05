import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    this.logger.debug(`validateUser: ${JSON.stringify({ username, pass })}`);
    const user = await this.usersService.findOneByUsername(username);

    let isPass = false;

    if (user) isPass = await bcrypt.compare(pass, user.password);

    if (user && isPass) {
      return {
        nombre: user.nombre,
        email: user.email,
        username: user.username,
        perfil: user.perfil,
        id: user.id,
        foto: user.foto,
      };
    }

    this.logger.error(`not validate user`);
    return null;
  }

  async login(user: LoginDto) {
    const dataUser = await this.validateUser(user.username, user.password);
    const payload = { username: user.username, sub: dataUser.id };
    return {
      access_token: this.jwtService.sign(payload),
      ...dataUser,
    };
  }
}
