import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.debug(`validate ${JSON.stringify({ username, password })}`);
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      this.logger.error(`error`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
