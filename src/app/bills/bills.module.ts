import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "../../config/jwt.config";
import { AuthGuard } from "../auth/auth.guard";
import { BillsController } from "./bills.controller";
import { AuthModule } from "../auth/auth.module";
import { BillsService } from "./bills.service";

@Module({
  imports: [AuthModule, JwtModule.register(jwtConfig)],
  controllers: [BillsController],
  providers: [BillsService, AuthGuard],
  exports: [],
})
export class BillsModule {}
