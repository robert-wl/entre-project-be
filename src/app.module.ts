import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./app/auth/auth.module";
import { UsersModule } from "./app/users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripsModule } from "./app/trips/trips.module";
import { BillsModule } from "./app/bills/bills.module";
import { DestinationsModule } from "./app/destinations/destinations.module";

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, TripsModule, BillsModule, DestinationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
