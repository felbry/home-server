import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
import { secretKey } from '../config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const reqRef: any = req;
    const token: string = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        throw new UnauthorizedException();
      }
      reqRef.user = decoded;
      next();
    });
  }
}
