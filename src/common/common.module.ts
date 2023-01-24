import { Global, Module } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ValidationExceptionInterceptor } from './interceptors/validation.exception.interceptor';

@Global()
@Module({
  providers: [ValidationExceptionInterceptor, ResponseInterceptor],
  exports: [ValidationExceptionInterceptor, ResponseInterceptor],
})
export class CommonModule {}
