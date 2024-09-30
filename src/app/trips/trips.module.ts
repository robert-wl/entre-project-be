import { Module } from "@nestjs/common";
import { TripsController } from "./trips.controller";
import { TripsService } from "./trips.service";
import { AuthGuard } from "../auth/auth.guard";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";

@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig)],
  controllers: [TripsController],
  providers: [TripsService, AuthGuard],
})
export class TripsModule {}
