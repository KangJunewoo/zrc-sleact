import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {


  constructor(private usersService: UsersService) {

  }

  @Get()
  getUsers() {

  }

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.usersService.postUsers(data.email, data.nickname, data.password);

  }

  @Post('login')
  logIn() {

  }

  @Post('logout')
  logOut() { // 웬만하면 컨트롤러도 req, res를 몰라야 한다.

  }
}
