import { Destination } from "@prisma/client";
import { IsNotEmpty } from "class-validator";

export class CreateDestinationResponseDTO {
    @IsNotEmpty()
    result: Destination;
}