import { IsNotEmpty } from "class-validator";

export class EditDestinationRequestDTO {
  @IsNotEmpty()
  destination: string;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  destinationId: number;
}
