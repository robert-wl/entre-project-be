import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateBillRequestDTO {
  @IsNotEmpty()
  tripId: number;

  @IsNotEmpty()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBillDetailDTO)
  billDetail: CreateBillDetailDTO[];
}

class CreateBillDetailDTO {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  itemName: string;

  @IsNotEmpty()
  quantity: number;
}
