import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; // class-validator의 포맷과 같음.

    // 에러 포매팅
    if (typeof err !== 'string' && err.statusCode === 400) {
      return response.status(statusCode).json({
        success: false,
        code: statusCode,
        data: err.message,
      });
    }

    response.status(statusCode).json({
      success: false,
      code: statusCode,
      data: err,
    });
  }
}
