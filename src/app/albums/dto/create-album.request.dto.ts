import { IsNotEmpty } from "class-validator";

export class CreateAlbumRequestDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tripId: number;
}
