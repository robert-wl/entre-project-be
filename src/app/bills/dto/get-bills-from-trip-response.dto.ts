import { IsNotEmpty } from "class-validator";
import { Bill } from "@prisma/client";

export class GetBillsFromTripResponseDTO {
  @IsNotEmpty()
  result: Bill[];
}
