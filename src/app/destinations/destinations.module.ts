import { Module } from "@nestjs/common";
import { DestinationsController } from "./destinations.controller";
import { DestinationsService } from "./destinations.service";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "src/config/jwt.config";
import { AuthGuard } from "../auth/auth.guard";
import { ImagesModule } from "../images/images.module";

@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig), ImagesModule],
  controllers: [DestinationsController],
  providers: [DestinationsService, AuthGuard],
  exports: [],
})
export class DestinationsModule {}
