import {
  Controller,
  Get,
  HttpCode,
  Logger,
  Request,
  Post,
  UseGuards,
} from '@nestjs/common';
import { version } from '../package.json';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  private readonly logger = new Logger(AppController.name);

  @Get('/healthcheck')
  @ApiOperation({ summary: 'Validar estado general del API' })
  @HttpCode(200)
  async check() {
    this.logger.debug(`healthcheck on ${Date.now()}`);
    return { status: 'OK', version: version };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
