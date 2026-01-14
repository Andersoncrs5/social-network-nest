import {
  Injectable,
   type NestInterceptor,
  type ExecutionContext,
  type CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { ResponseHTTP } from '../res/http/response.res';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseHTTP<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseHTTP<T>> {
    const request = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      map((data: any) => ({
        data,
        message: 'Success',
        traceId: request.headers['x-trace-id'] || '54353252',
        success: true,
        version: 1, // Pode vir do app version ou config
        timestamp: new Date().toISOString(),
      })),
    );
  }
}