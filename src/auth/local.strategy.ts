import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.debug(`validate ${JSON.stringify({ username, password })}`);
    const newPassword = await bcrypt.hash(password, 10);
    const user = await this.authService.validateUser(username, newPassword);

    if (!user) {
      this.logger.error(`error`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
