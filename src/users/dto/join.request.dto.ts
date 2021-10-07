import { ApiProperty } from '@nestjs/swagger';

/*
dto의 경우 수동으로 apiproperty 데코레이터로 설명을 달아줘야 한다.
api문서 공들여서 만드는게 생각보다 시간은 오래 걸린다.
하지만 꼼꼼하게 만들수록 좋다.
 */
export class JoinRequestDto {
  @ApiProperty({
    example: 'brianjune.dev@gmail.com',
    description: '이메일',
    required: true,
  })
  public email: string;

  @ApiProperty({
    example: '카초',
    description: '닉네임',
    required: true,
  })
  public nickname: string;

  @ApiProperty({
    example: 'merong',
    description: '비밀번호',
    required: true,
  })
  public password: string;

}