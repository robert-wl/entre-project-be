import { isNotEmpty, IsNotEmpty } from "class-validator";

export class CreateItineraryRequestDto {
  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  itineraryDetail: ItineraryDetail[];

  @IsNotEmpty()
  tripId: number;
}

class ItineraryDetail {
  date: Date;
  itineraryItems: ItineraryItem[];
}

class ItineraryItem {
  startHour: string;
  endHour: string;
  detailName: string;
}
