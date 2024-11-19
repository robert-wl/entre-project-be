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
import { AlbumsModule } from "./app/albums/albums.module";
import { ImagesModule } from "./app/images/images.module";
import { ImagesController } from "./app/images/images.controller";
import { ImagesService } from "./app/images/images.service";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
    TripsModule,
    BillsModule,
    DestinationsModule,
    ItinerariesModule,
    AlbumsModule,
    ImagesModule,
  ],
  controllers: [AppController, ImagesController],
  providers: [AppService, ImagesService],
})
export class AppModule {}
