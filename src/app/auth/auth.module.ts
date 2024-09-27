import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthStrategy } from "./auth.strategy";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import Constants from "../../constants";
import { AuthGuard } from "./auth.guard";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: Constants.Security.JWT_SECRET_KEY,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthStrategy, AuthGuard],
  exports: [],
})
export class AuthModule {}
