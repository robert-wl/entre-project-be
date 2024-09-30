import { IsNotEmpty } from "class-validator";

export class ConfirmBillRequestDTO {
  @IsNotEmpty()
  billDetailId: number;
}
