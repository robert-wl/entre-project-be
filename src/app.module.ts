import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { TripsModule } from './app/trips/trips.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, TripsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
