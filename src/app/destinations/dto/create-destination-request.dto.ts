import { IsNotEmpty } from "class-validator";

export class CreateDestinationRequestDto {
  @IsNotEmpty()
  destination: string;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  tripId: number;
}
