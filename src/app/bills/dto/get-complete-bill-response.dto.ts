import { IsNotEmpty } from "class-validator";
import { Bill } from "@prisma/client";

export class GetCompleteBillResponseDTO {
  @IsNotEmpty()
  result: Bill;
}
