import { IsNotEmpty } from "class-validator";
import { Album } from "@prisma/client";

export class CreateAlbumResponseDTO {
  @IsNotEmpty()
  result: Album;
}
