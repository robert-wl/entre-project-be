import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./app/auth/auth.module";
import { UsersModule } from "./app/users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TripsModule } from "./app/trips/trips.module";
import { BillsModule } from "./app/bills/bills.module";
import { DestinationsModule } from "./app/destinations/destinations.module";
import { ItinerariesModule } from "./app/itineraries/itineraries.module";
import { AlbumsController } from "./app/albums/albums.controller";
import { AlbumsModule } from "./app/albums/albums.module";

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, TripsModule, BillsModule, DestinationsModule, ItinerariesModule, AlbumsModule],
  controllers: [AppController, AlbumsController],
  providers: [AppService],
})
export class AppModule {}
