import { IsNotEmpty } from "class-validator";
import { BillDetail } from "@prisma/client";

export class GetBillDetailResponseDTO {
  @IsNotEmpty()
  result: BillDetail[];
}
