import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs'; // rx에 궁금한게 있으면 공식문서 찾아보자. 제로초도 완벽하게 아는 건 아니라고 함.

/*
스프링 AOP랑 비슷한 개념.
여기선 마지막에 데이터를 한 번 감싸주는 역할로 쓰임.
 */
@UseInterceptors(UndefinedToNullInterceptor)
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // return next.handle().pipe(catchError); 에러도 할 수 있긴 하지만 이는 익셉션필터에서 다ㅜㄹ 예정.

    return next.handle().pipe(
      map((data) => (data === undefined ? null : data)),
      // map((data) => ({ data , code: 'SUCCESS' })),
    );
  }
}