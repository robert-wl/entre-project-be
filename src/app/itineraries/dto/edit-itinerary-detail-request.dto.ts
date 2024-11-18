import { IsNotEmpty } from "class-validator";

export class EditItineraryDetailRequestDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  itineraryItems: ItineraryItem[];
}

class ItineraryItem {
  id?: number;
  startHour: string;
  endHour: string;
  detailName: string;
}
