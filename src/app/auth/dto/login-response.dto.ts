import { IsNotEmpty } from 'class-validator';

export class LoginResponseDTO {
  @IsNotEmpty()
  access_token: string;
}
