import { IsNotEmpty } from "class-validator";
import { AlbumDetail } from "@prisma/client";

export class GetAlbumDetailsResponseDTO {
  @IsNotEmpty()
  result: AlbumDetail[];
}
