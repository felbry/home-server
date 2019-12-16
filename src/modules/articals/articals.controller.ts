const fs = require('fs');
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
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectModel } from '@nestjs/mongoose';
import { Artical } from './artical.interface';
import { Afile } from '../afiles/afile.interface';
import { MulterFile } from '../multer-file.interface';
import ReqPostArticals from './dto/req-post-articals.dto';
import { ReqGetArticals, ResGetArticals } from './dto/get-articals.dto';
import getFileMd5 from '../../utils/get-file-md5';

@Injectable()
@Controller('articals')
export class ArticalsController {
  constructor(
    @InjectModel('Artical') private readonly articalModel: Model<Artical>,
    @InjectModel('File') private readonly fileModel: Model<Afile>,
  ) {}

  @Get()
  async getArticals(@Query() query: ReqGetArticals): Promise<ResGetArticals> {
    return Promise.all([
      this.articalModel
        .find()
        .limit(query.pageSize)
        .skip((query.page - 1) * query.pageSize)
        .populate('author', 'nickName gender')
        .exec(),
      this.articalModel
        .find()
        .estimatedDocumentCount()
        .exec(),
    ]).then(
      ([articalListRet, total]: [Artical[], number]) =>
        ({
          articalList: articalListRet,
          total,
        } as ResGetArticals),
    );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createArticals(
    @UploadedFile() file: MulterFile,
    @Body() artical: ReqPostArticals,
    @Request() req,
  ): Promise<Artical> {
    let md5: string;
    return getFileMd5(file.buffer)
      .then((md5Ret: string): Afile | null => {
        md5 = md5Ret;
        return this.fileModel.findOne({
          md5,
        });
      })
      .then(
        (fileRet: Afile | null): Afile => {
          const publicPath: string = `/static/articals/${md5}`;
          if (fileRet) {
            return fileRet;
          }
          fs.writeFileSync(process.cwd() + publicPath, file.buffer);
          return this.fileModel.create({
            mimetype: file.mimetype,
            size: file.size,
            encoding: file.encoding,
            originalName: file.originalname,
            publicPath,
            md5,
          });
        },
      )
      .then(
        (fileRet: Afile): Artical => {
          return this.articalModel.create({
            title: artical.title,
            file: fileRet._id,
            author: req.user.uid,
          });
        },
      );
  }
}
