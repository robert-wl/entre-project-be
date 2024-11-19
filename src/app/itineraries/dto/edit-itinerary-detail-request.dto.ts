import { IsNotEmpty } from "class-validator";

export class EditItineraryDetailRequestDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  itineraryDetails: ItineraryDetail[];
}

class ItineraryDetail {
  id: number;
  date: string;
  itineraryItems: ItineraryItem[];
}

class ItineraryItem {
  id?: number;
  startHour: string;
  endHour: string;
  detailName: string;
}
