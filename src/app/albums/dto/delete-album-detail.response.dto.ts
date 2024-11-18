import { IsNotEmpty } from "class-validator";
import { AlbumDetail } from "@prisma/client";

export class DeleteAlbumDetailResponseDTO {
  @IsNotEmpty()
  result: AlbumDetail;
}
