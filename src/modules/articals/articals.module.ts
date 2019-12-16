import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticalsController } from './articals.controller';
import { ArticalSchema } from './artical.schema';
import { AfileSchema } from '../afiles/afile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Artical', schema: ArticalSchema },
      { name: 'File', schema: AfileSchema },
    ]),
  ],
  controllers: [ArticalsController],
})
export class ArticalsModule {}
