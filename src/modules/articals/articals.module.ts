import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { ArticalsController } from './articals.controller';
import { ArticalSchema } from './artical.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Artical', schema: ArticalSchema }]),
  ],
  controllers: [ArticalsController],
})
export class ArticalsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(ArticalsController);
  }
}
