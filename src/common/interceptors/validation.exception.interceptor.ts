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
import { QueryFailedError } from 'typeorm';
import { ErrorResponse, ResponseEnums } from '../interfaces/responses';

@Injectable()
export class ValidationExceptionInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ValidationExceptionInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(e => {
        this.logger.error(`ERROR_DETAIL: ${JSON.stringify(e)}`);
        this.logger.error(e);

        let error: HttpException;

        if (e instanceof HttpException) {
          error = e;
        } else if (e instanceof QueryFailedError) {
          error = new HttpException(e, HttpStatus.UNPROCESSABLE_ENTITY);
        } else {
          error = new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        let errorResponse: ErrorResponse = Object.assign({}, ResponseEnums[error.getStatus()])

        if (e.response && error.getStatus() === HttpStatus.UNPROCESSABLE_ENTITY) {
          if (typeof e.response.message == 'string') {
            e.response.message = [e.response.message];
          }
          errorResponse.errors = e?.response?.message || 'Unknown error';
        }

        if (e instanceof QueryFailedError) {
          errorResponse.message = e.driverError.sqlMessage;
          const { code, errno, sqlState, sqlMessage } = e.driverError;
          errorResponse.errors = { code, errno, sqlState, sqlMessage };
        }

        if ((process.env.ENV || 'PROD') != 'PROD') {
          errorResponse.stacktraces = e;
        }

        return throwError(
          () => new HttpException(errorResponse, error.getStatus()),
        );
      }),
    );
  }
}
