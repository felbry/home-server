import { Model } from 'mongoose';
import { Controller, Injectable, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const jwt = require('jsonwebtoken');

import { User } from './user.interface';
import { ReqLogin, ResLogin } from './dto/login.dto';
import { secretKey } from 'src/config';

@Injectable()
@Controller('users')
export class UsersController {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  @Post('login')
  async login(@Body() userInfo: ReqLogin): Promise<ResLogin> {
    const { username, password } = userInfo;
    const userRet: User | null = await this.userModel
      .findOne({
        username,
        password,
      })
      .exec();
    if (userRet) {
      return {
        token: jwt.sign(
          {
            uid: userRet._id,
          },
          secretKey,
        ),
      } as ResLogin;
    }
  }
}
