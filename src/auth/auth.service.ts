import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

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

    if (user) isPass = await bcrypt.compare(user.password, pass);

    if (user && isPass) {
      const { password, ...result } = user;
      this.logger.debug('Password match', password);
      return result;
    }

    this.logger.error(`not validate user`);
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
