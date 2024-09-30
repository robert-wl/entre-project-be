import { Trip } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class GetMyTipsResponseDTO {
  @IsNotEmpty()
  result: Trip[];
}
