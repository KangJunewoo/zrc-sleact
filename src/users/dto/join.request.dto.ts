import { ApiProperty, PickType } from '@nestjs/swagger';
import { Users } from '../../entities/Users';

/*
dto의 경우 수동으로 apiproperty 데코레이터로 설명을 달아줘야 한다.
api문서 공들여서 만드는게 생각보다 시간은 오래 걸린다.
하지만 꼼꼼하게 만들수록 좋다.

그리고 PickType으로 엔티티에서 원하는 멤버만 빼올 수 있다.
 */
export class JoinRequestDto extends PickType(Users, [
  'email',
  'nickname',
  'password',
] as const) {}
