import { IsNotEmpty } from "class-validator";

export class DeleteDestinationRequestDTO {
  @IsNotEmpty()
  destinationId: number;
}
