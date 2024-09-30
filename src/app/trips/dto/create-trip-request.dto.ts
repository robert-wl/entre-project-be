import { IsNotEmpty } from "class-validator";

export class CreateTripRequestDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  numberOfTravelers: number;
}
