import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from '../../users/dto/join.request.dto';

export class UserDto extends JoinRequestDto{ // 상속해서 편하게!
  @ApiProperty({
    required: true,
    example: 1,
    description: '아이디',
  })
  id: number;
}