import { IsNotEmpty } from "class-validator";
import { User } from "@prisma/client";

export class LoginResponseDTO {
  @IsNotEmpty()
  access_token: string;
  @IsNotEmpty()
  user: Omit<User, "password">;
}
