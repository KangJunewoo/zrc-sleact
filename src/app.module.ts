import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';

// 네스트에선 라우터가 아닌 모듈 위주의 설계를 함.
@Module({
  imports: [ConfigModule.forRoot()], // dotenv 불러오기
  controllers: [AppController],
  providers: [AppService] // Injectables
})
export class AppModule implements NestModule {
  configure(consumer:MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
