import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Omit<User, "password">> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user.password !== password) {
      throw new UnauthorizedException("Invalid Password");
    }

    const { password: _, ...rest } = user;

    return {
      access_token: await this.jwtService.signAsync({
        username: user.email,
        sub: user.id,
      }),
      user: rest,
    };
  }
}
