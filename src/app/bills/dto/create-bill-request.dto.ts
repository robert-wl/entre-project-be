import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateBillRequestDTO {
  @IsNotEmpty()
  tripId: number;

  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBillDetailDTO)
  billDetail: CreateBillDetailDTO[];
}

class CreateBillDetailDTO {
  @IsNotEmpty()
  userId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateBillItemDTO)
  billItems: CreateBillItemDTO[];
}

class CreateBillItemDTO {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  itemName: string;

  @IsNotEmpty()
  quantity: number;
}
