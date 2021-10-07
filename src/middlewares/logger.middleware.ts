import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  // 로거를 다음과 같이 만들어서 쓸 수 도 있다. 다만 실무에서는 nest morgan 사용 추천.
  use(req: Request, res: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    // 로깅은 res가 finish된 담에 이루어짐. 그래서 콜백으로 등록한거.
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      // console.log가 아닌 로거를 가져와서 로깅해줌.
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();

  }


}