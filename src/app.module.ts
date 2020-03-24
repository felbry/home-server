import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticalsModule } from './modules/articals/articals.module';
import { UsersModule } from './modules/users/users.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../home-fe/dist'),
    }),
    ArticalsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
