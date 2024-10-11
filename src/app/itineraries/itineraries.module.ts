import { Module } from "@nestjs/common";
import { ItinerariesController } from "./itineraries.controller";
import { ItinerariesService } from "./itineraries.service";
import { AuthGuard } from "../auth/auth.guard";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/config/jwt.config";

@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig)],
  controllers: [ItinerariesController],
  providers: [ItinerariesService, AuthGuard],
})
export class ItinerariesModule {}
