import { User } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class MeResponseDTO {
  @IsNotEmpty()
  user: Omit<User, "password">;
}
