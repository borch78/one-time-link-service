import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { LinkIsNotActiveError } from '../../links/errors';

@Catch(LinkIsNotActiveError)
export class LinkIsNoActiveExceptionFilter implements ExceptionFilter {
  catch(exception: LinkIsNotActiveError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const json = {
      code: HttpStatus.NOT_ACCEPTABLE,
      message: exception.message,
    };

    response.status(HttpStatus.NOT_ACCEPTABLE).json(json);
  }
}
