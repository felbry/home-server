import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticalsController } from './articals.controller';
import { ArticalSchema } from './artical.schema';
import { FileSchema } from '../files/file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Artical', schema: ArticalSchema },
      { name: 'File', schema: FileSchema },
    ]),
  ],
  controllers: [ArticalsController],
})
export class ArticalsModule {}
