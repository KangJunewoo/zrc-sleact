import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  getUser() {
  }

  async join(email: string, nickname: string, password: string) {
    // 세개 모두 valid한지 검사해줘야함. 다만 번거롭다. 이를 dto에서 자동체크하도록 하자.
    /*
    async 안에선(promise 안에선) error를 throw해도 서버가 죽지 않는다. 알아서 catch되버리기 때문.
    그래서 에러가 throw되어도 200 응답이 가게 된다.
    httpexception을 throw해도 똑같아서, 따로 exception filter를 만들어줘야 한다.

    만든 후 해당 로직을 await으로 실행하게 된다면, 에러가 밖으로 빠져나오게 된다.

     */
    if (!email) {
      // 이메일 없음 에러
      // throw new Error('이메일이 없네요');
      throw new HttpException('이메일이 없네요', 400);
    }
    if (!nickname) {
      // 닉넴 없음 에러
      throw new HttpException('닉넴이 없네요', 400);

    }
    if (!password) {
      // pw 없음 에러
      throw new HttpException('PW가 없네요', 400);
    }

    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저. 에러 출력
      throw new UnauthorizedException('이미 존재하는 사용자에요');
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email, nickname, password: hashedPassword,
    });
  }
}
