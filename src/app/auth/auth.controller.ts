import { Body, Controller, Get, Post, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginRequestDTO } from "./dto/login-request.dto";
import { LoginResponseDTO } from "./dto/login-response.dto";
import { ResponseValidationInterceptor } from "../interceptors/response-validation.interceptor";
import { MeResponseDTO } from "./dto/me-response.dto";
import { UsersService } from "../users/users.service";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post("login")
  @UseInterceptors(new ResponseValidationInterceptor(LoginResponseDTO))
  async login(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    return this.authService.login(dto.email, dto.password);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Request() req): Promise<MeResponseDTO> {
    console.log(req);
    const user = await this.usersService.findId(req.user.id);

    return {
      user,
    };
  }
}
