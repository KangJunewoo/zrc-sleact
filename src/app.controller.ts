import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 앱서비스가 DI되었다고 생각하면 됨. DI의 장점은 메모리가 덜잡아먹는거랑 테스트의 편리함이랑 결합도를 낮춰 유연하게 만들어주는거
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
