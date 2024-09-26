import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { LoginResponseDTO } from './dto/login-response.dto';
import { ResponseValidationInterceptor } from '../interceptors/response-validation.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseInterceptors(new ResponseValidationInterceptor(LoginResponseDTO))
  async login(@Body() dto: LoginRequestDTO): Promise<LoginResponseDTO> {
    return await this.authService.login(dto.email, dto.password);
  }
}
