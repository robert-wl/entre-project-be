import { IsNotEmpty } from "class-validator";
import { Album } from "@prisma/client";

export class GetAlbumDetailsResponseDTO {
  @IsNotEmpty()
  result: Album;
}
