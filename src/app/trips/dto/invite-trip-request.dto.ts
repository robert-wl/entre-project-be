import { IsNotEmpty } from "class-validator";

export class InviteTripMemberRequestDto {
  @IsNotEmpty()
  tripId: number;

  @IsNotEmpty()
  emails: string;
}
