import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
const jwt = require('jsonwebtoken');
import { secretKey } from '../config';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers.authorization
      ? request.headers.authorization.split(' ')[1]
      : '';
    let isValidate: boolean = false;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (!err) {
        request.user = decoded;
        isValidate = true;
      }
    });
    if (isValidate) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
