import { IsNotEmpty } from "class-validator";

export class CreateTripRequestDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
