import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('api/workspaces/:url/channels')
export class ChannelsController {
  @Get()
  getAllChannels() {

  }

  @Get(':name')
  getSpecificChannel() { // 이름 길게짓는게 대충짓는것보다 낫다. 나중에 헷갈려진다.

  }


  @Post()
  createChannel() {

  }

  @Get(':name/chats')
  getChat(@Query() query, @Param() param) {
    console.log(query.perPage, query.perPage);
    console.log(param.id, param.url);

  }


  @Post(':name/chats')
  postChat(@Body() body) {

  }

  @Get(':name/members')
  getAllMembers() {
  }

  @Post(':name/members')
  inviteMembers() {

  }


}
