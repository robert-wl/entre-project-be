import { IsNotEmpty } from "class-validator";
import { Album } from "@prisma/client";

export class GetAlbumsResponseDTO {
  @IsNotEmpty()
  result: Album[];
}
