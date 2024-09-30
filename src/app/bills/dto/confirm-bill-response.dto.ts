import { IsNotEmpty } from "class-validator";

export class ConfirmBillResponseDTO {
  @IsNotEmpty()
  result: boolean;
}
