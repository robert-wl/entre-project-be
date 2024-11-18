import { IsNotEmpty } from "class-validator";

export class CreateAlbumDetailRequestDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  albumId: number;

  @IsNotEmpty()
  image: string;
}
