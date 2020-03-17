import { Model } from 'mongoose';
import { Controller, Injectable, Post, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
const jwt = require('jsonwebtoken');

import { User } from './user.interface';
import { ReqRegistry } from './dto/registry.dto';
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
    } else {
      throw Error('用户名或密码错误');
    }
  }

  @Post('registry')
  async registry(@Body() userInfo: ReqRegistry): Promise<User> {
    const { password, nickName, username } = userInfo;
    const userRet: User | null = await this.userModel
      .findOne({
        username
      })
      .exec();
    if (userRet) {
      throw Error('用户已存在')
    } else {
      return this.userModel.create({
        username,
        password,
        nickName,
      });
    }
  }
}
