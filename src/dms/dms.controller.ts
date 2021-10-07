import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/dms')
export class DmsController {
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) { // 쿼리와 파람은 통째로 받아올수도, 하나씩 받아올수도 있음.
    console.log(query.perPage, query.page);
  }

  @Post(':id/chats')
  postChat(@Body() body) {

  }
}
