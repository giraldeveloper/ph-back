import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { version } from '../package.json';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('/healthcheck')
  @HttpCode(200)
  async check() {
    this.logger.debug(`healthcheck on ${Date.now()}`);
    return { status: 'OK', version: version };
  }
}
