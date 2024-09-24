import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Nullable } from '../types/utils';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<Nullable<User>> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
