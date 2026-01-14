import { ResponseHTTP } from '@app/common';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('GlobalExceptionHandler');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException 
      ? exception.message 
      : 'Internal server error';

    if (status >= 500 ) {
      this.logger.error(`Exception: ${message}`, exception.stack);  
    }

    const errorResponse: ResponseHTTP<null> = {
        data: null,
        message: message,
        traceId: randomUUID(),
        success: false,
        version: 1,
        timestamp: new Date().toISOString(),
    };

    response.code(status).send(errorResponse);
  }
}