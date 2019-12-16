import { Model } from 'mongoose';
import {
  Controller,
  Injectable,
  UseInterceptors,
  UploadedFile,
  Request,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Artical } from './artical.interface';
import { MulterFile } from '../multer-file.interface';

@Injectable()
@Controller('articals')
export class ArticalsController {
  constructor(
    @InjectModel('Artical') private readonly articalModel: Model<Artical>,
  ) {}

  @Get()
  async getArticals(): Promise<Artical[]> {
    return await this.articalModel.find().exec();
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createArtical(
    @UploadedFile() file: MulterFile,
    @Body() artical: any,
    @Request() req,
  ): Promise<any> {
    // 这里是为了抛错，验证错误捕获机制
    return this.articalModel.create({
      title: '111',
    });
  }
}
