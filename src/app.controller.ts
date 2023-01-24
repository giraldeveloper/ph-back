import { Controller, Get, HttpCode, Logger } from '@nestjs/common';
import { version } from '../package.json';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @Get('/healthcheck')
  @ApiOperation({ summary: 'Validar estado general del API' })
  @HttpCode(200)
  async check() {
    this.logger.debug(`healthcheck on ${Date.now()}`);
    return { status: 'OK', version: version };
  }
}
