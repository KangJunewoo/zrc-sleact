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

## DB 설계 관련
- [ERD 시각적으로 보기 좋은 곳](https://erdcloud.com)
- JPA랑 거의 똑같다.
- 기존 설계된 db를 네스트 엔티티로 옮길땐 typeorm-model-generator를 쓰면 되고
- 직접 엔티티를 짜서 만들땐 옵션에 synchronize: true로 옮겨주면 됨.
- raw query 당연히 날릴 수 있다.
- 초기데이터 넣는걸 seeding이라고 함. 초기데이터 넣을땐 typeorm-seeding 설치.
  - 더미로 넣을거면 faker로 만드는게 좋음 (다양한 랜덤이름 generate해줌.)
- 칼럼을 바꾸려면 두 번을 바꿔야함. 실수하면 불일치 뜨겠지.
  - 마이그레이션을 사용해서 코드로 변경사항을 둘에게 다 반영하는게 좋음.
  - 잘못바꾼것같으면 롤백도 가능.
  - `npx typeorm migration:create -n categoryToType` : 수동옵션
  - `npx typeorm migration:generate -n categoryToType` : 자동옵션
- typeorm 관련 모듈들은 ts인식을 잘 못함. package.json에서 ts를 인식할 수 있도록 별도의 처리를 해줘야 함.
- typeorm 조회 시 조인 방법 두가지
  - relations => 추천.
  - join => 복잡.
- 트랜잭션 쓰는방법 여러가지 있는데, 공식문서에선 데코레이터 대신 쿼리러너 쓰는 걸 추천하는 편. 
- 컨트롤러에서 받은 파람은 항상 문자열로 들어옴. ParseIntPipe 등의 파이프로 형변환하는거 추천!
  - 혹은 class-transformer 설치하고 main.ts에 transform:true 설정
- dto 만드는 것
  - 장점 : validation, 문서화, 타입교정 
  - 단점 : 귀찮다
  - 장점이 단점보다 많으니 적극 쓰도록 하자. 중복 줄일려면 PickType 상속해서 엔티티에 있는것들 빼오면 됨.
- 쿼리를 날려야 할 경우 쿼리빌더 권장. querydsl 비슷한것같다. 
  - 이 부분이 sequelize보다 나은 점이다.

## api 구현 관련
- 노드교과서 패스포트 부분 보고오자.
- 최적화
  - 동시에 될 수 있는건 PromiseAll 같은거 써서 굳이 블록하지 말자.

## 기타 팁들
- CRUD 자동화 : 공식문서 /cli/usages에 nest g resource users 하면 유저 CRUD api 싹 생성됨.
- 공식문서 실전예제 없는것만 빼면 되게 잘되어있다.

## 테스트 관련
- 테스트 커버리지 100%면 황당한 에러는 안난다. 그래도 에러 난다.
  - 애초에 테스트 설계를 잘못하면 TDD를 하든 커버리지 100이든 실환경에서 에러난다.
- 테스트 우선순위
  - 돈 걸린거
  - 한 번 장애난 이력이 있는거
- e2e 테스트
  - 자동화된 axios라고 생각하면 됨.
  - 가짜 DB로 해야함.
  - jest가 생각하는 경로를 속여줘야함. package.json의 jest 부분에 modulemapper 참조.
  