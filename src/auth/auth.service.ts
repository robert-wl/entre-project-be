import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    return result;
  }
}
