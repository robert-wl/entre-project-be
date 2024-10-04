import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateBillRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  tripId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBillDetailDTO)
  billDetail: CreateBillDetailDTO[];
}

class CreateBillDetailDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ValidateNested({ each: true })
  @Type(() => CreateBillItemDTO)
  billItems: CreateBillItemDTO[];
}

class CreateBillItemDTO {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  itemName: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
