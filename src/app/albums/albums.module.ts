import { Module } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { AlbumsController } from "./albums.controller";
import { AuthModule } from "../auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";
import { AuthGuard } from "../auth/auth.guard";

@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig)],
  controllers: [AlbumsController],
  providers: [AlbumsService, AuthGuard],
  exports: [],
})
export class AlbumsModule {}
