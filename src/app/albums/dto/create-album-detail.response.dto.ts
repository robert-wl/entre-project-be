import { IsNotEmpty } from "class-validator";
import { AlbumDetail } from "@prisma/client";

export class CreateAlbumDetailResponseDTO {
  @IsNotEmpty()
  result: AlbumDetail;
}
