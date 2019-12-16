import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticalsModule } from './modules/articals/articals.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ArticalsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
