import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './httpException.filter';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  자세한 선후관계는 공식문서 faq/request-lifecycle에 나와있음.
  요청 미들웨어 가드 인터셉터 파이프 컨트롤러 인터셉터 응답
   */
  const port = process.env.PORT || 3000;
  // class-validator 활성화
  app.useGlobalPipes(new ValidationPipe());
  // 모든 컨트롤러에서 발생하는 httpexception을 여기서 잡겠다!
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('sleact api')
    .setDescription('sleact 개발을 위한 api 문서')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(port);
  console.log(`listening on port ${port}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
