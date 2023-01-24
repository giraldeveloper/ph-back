import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorResponse, ResponseEnums } from '../interfaces/responses';

@Injectable()
export class ValidationExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ValidationExceptionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        this.logger.error(`ERROR_DETAIL: `, err);

        let error: HttpException;
        if (err instanceof HttpException) {
          error = err;
        } else {
          error = new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const errorResponse: ErrorResponse = ResponseEnums[error.getStatus()];
        if (
          err.response &&
          error.getStatus() === HttpStatus.UNPROCESSABLE_ENTITY
        ) {
          if (typeof err.response.message == 'string')
            err.response.message = [err.response.message];
          errorResponse.errors = err?.response?.message || 'Unknown error';
        } else {
          if ((process.env.ENV || 'PROD') != 'PROD')
            errorResponse.stacktraces = err;
        }

        return throwError(
          () => new HttpException(errorResponse, error.getStatus()),
        );
      }),
    );
  }
}
