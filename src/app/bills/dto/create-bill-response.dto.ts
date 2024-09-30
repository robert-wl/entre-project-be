import { IsNotEmpty } from "class-validator";
import { Bill } from "@prisma/client";

export class CreateBillResponseDTO {
  @IsNotEmpty()
  result: Bill;
}
