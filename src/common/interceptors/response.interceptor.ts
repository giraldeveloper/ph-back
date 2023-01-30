import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SUCCESSFUL_RESPONSE, SuccessResponse } from '../interfaces/responses';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse> {
    return next.handle().pipe(
      map(response => {
        const successResponse: SuccessResponse = SUCCESSFUL_RESPONSE;
        successResponse.data = response;
        return successResponse;
      }),
    );
  }
}
