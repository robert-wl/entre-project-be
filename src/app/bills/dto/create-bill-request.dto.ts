import { IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class CreateBillRequestDTO {
  @IsNotEmpty()
  @IsNumber()
  tripId: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => CreateBillDetailDTO)
  billDetail: CreateBillDetailDTO[];
}

class CreateBillDetailDTO {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
