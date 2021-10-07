## ts + nest.js
기존 js + express 프로젝트를 ts + nest로 마이그레이션해보자.

## 마이그레이션의 이유
- API문서 만들기가 쉬워짐 ([공식문서](https://docs.nestjs.com/openapi/introduction))
- type-safe 하기 때문
- 모듈 중심.
- 서비스단에서 요청과 응답에 대한 분리
  - 익스프레스에선 미들웨어에서 요청, 비즈니스로직, 응답을 같이 짜줘야 했음.
  - 여기서 비즈니스로직만 서비스로 분리를 했는데 이러면 좋은게
    - 재사용할수 있고
    - 단위테스트 짜기가 쉬움
      - 익스프레스에서 테스트하려면 req res next를 모두 모킹해줘야했음.
    - 구조에 대한 강제성 : 협업할 때 수월함.

## qna
- js의 메모리 사용
  - 대부분은 힙에 저장이 되고
  - 스택엔 호출컨텍스트만 저장된다고 보면 됨.
- 서비스가 많이 무거워지면 안좋은가?
  - 그래도 컨트롤러에 몰아넣는것보단 낫다.
  - 그래도 서비스가 무거워지면 그걸 여러 서비스 혹은 모듈로 분리하면 됨.
- 로그를 nosql에 저장하는가?
  - 다른 서비스에 쓸거면 ㅇㅇ
  - 모니터링 용도로는 sentry나 datadog이나 aws cloudwatch에 보내버림.
- 익스프레스에서 DI를 왜 안쓰는가?
  - 프레임워크가 지원을 안해주거든 ㅋ
  - 수동으로 할 수 있도록 지원해주는 라이브러리는 있음. express-di 참조.
  - 위 라이브러리를 써도 결국 `res.json()`으로 항상 끝나기에, res에 의존적임.
- 로깅시 윈스턴 쓰면 안되는가?
  - 파일로 저장할거면 윈스턴 쓰자.
  - 모니터링 서비스에 보낼거면 그냥 로거로.
- 제로초가 선호하는 서버세팅은?
  - pm2로 배포, 싱글코어로 동작시킴.
  - 인스턴스 조그만한거 쓰고, 로드밸런서는 따로 붙임.
- 인터셉터 == AOP


## 관련 글들
- [기존 방식(require)의 작동원리](https://m.blog.naver.com/jdub7138/221022257248)
- [node에서의 DI](https://velog.io/@moongq/Dependency-Injection)