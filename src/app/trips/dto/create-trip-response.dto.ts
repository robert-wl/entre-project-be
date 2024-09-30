import { IsNotEmpty } from "class-validator";
import { Trip } from "@prisma/client";

export class CreateTripResponseDTO {
  @IsNotEmpty()
  result: Trip;
}
