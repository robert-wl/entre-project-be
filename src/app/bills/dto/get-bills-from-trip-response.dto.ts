import { IsNotEmpty } from "class-validator";
import { Bill } from "@prisma/client";

export class GetBillsFromTripResponseDTO {
  @IsNotEmpty()
  result: BillWithPaidStatus[];
}

interface BillWithPaidStatus extends Bill {
  isPaid: boolean;
}
