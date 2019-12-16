import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.OK;
    response.status(status).json({
      code: -1,
      statusCode: status,
      msg: `[${request.method} ${request.url}] ${
        exception.response
          ? exception.response.error
          : exception.errors
          ? JSON.stringify(exception.errors)
          : exception.toString()
      }`,
    });
  }
}
