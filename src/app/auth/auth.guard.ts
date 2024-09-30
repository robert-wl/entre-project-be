import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import Constants from "../../constants";
import { Nullable } from "../../types/utils";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException("Token is missing");
    }
    try {
      console.log("GOT TEOKEN", token);
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: Constants.Security.JWT_SECRET_KEY,
      });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException("Token is invalid or it's signature is expired");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): Nullable<string> {
    const authorization = request.headers["Authorization"] ?? request.headers["authorization"];

    if (!authorization) {
      return null;
    }

    const [type, token] = authorization.split(" ") ?? [];
    return type === "Bearer" ? token : null;
  }
}
