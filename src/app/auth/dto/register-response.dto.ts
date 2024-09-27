import { IsNotEmpty } from "class-validator";

export class RegisterResponseDTO {
  @IsNotEmpty()
  result: boolean;
}
