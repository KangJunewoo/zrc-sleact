import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkspaces() {

  }

  @Post()
  createWorkspace() {

  }

  @Get(':url/members')
  getAllMembersFromWorkspace() {

  }

  @Post(':url/members')
  inviteMembersToWorkspace() {

  }

  @Delete(':url/members/:id')
  kickMemberFromWorkspace() {

  }

  @Get(':url/members/:id')
  getMemberInfoInWorkspace() {
  }

  @Get(':url/users/:id') // api 한 번 잘못만들면 사용자가 한 명이라도 생기는 순간부터 수정하기 정말 힘들다. python2가 그렇게 나왔다.
  DEPRECATED_getMemberInfoInWorkspace() {
    this.getMemberInfoInWorkspace();
  }
}
