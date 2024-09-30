import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthStrategy } from "./auth.strategy";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";
import { jwtConfig } from "../../config/jwt.config";

@Module({
  imports: [UsersModule, JwtModule.register(jwtConfig)],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, AuthGuard],
  exports: [],
})
export class AuthModule {}
