import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ChannelsController } from './channels/channels.controller';
import { DmsController } from './dms/dms.controller';
import { UsersController } from './users/users.controller';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { ChannelsService } from './channels/channels.service';
import { DmsService } from './dms/dms.service';
import { UsersService } from './users/users.service';
import { WorkspacesService } from './workspaces/workspaces.service';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

// 네스트에선 라우터가 아닌 모듈 위주의 설계를 함.
@Module({
  imports: [ConfigModule.forRoot(), ChannelsModule, DmsModule, UsersModule, WorkspacesModule], // dotenv 불러오기
  controllers: [AppController, ChannelsController, DmsController, UsersController, WorkspacesController],
  providers: [AppService, ChannelsService, DmsService, UsersService, WorkspacesService] // Injectables
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
