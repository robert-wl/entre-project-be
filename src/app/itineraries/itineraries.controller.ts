import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ItinerariesService } from "./itineraries.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateItineraryRequestDto } from "./dto/create-itinerary-request.dto";
import { Sender } from "src/decorators/sender.decorator";
import { User } from "@prisma/client";

@Controller("itineraries")
export class ItinerariesController {
  constructor(private itineraryService: ItinerariesService) {}

  @Post("/")
  @UseGuards(AuthGuard)
  async createItinerary(@Sender() sender: User, @Body() dto: CreateItineraryRequestDto) {
    const result = await this.itineraryService.createItinerary(dto.startDate, dto.endDate, dto.tripId, sender.id);

    await Promise.all(
      dto.itineraryDetail.map(async (detail) => {
        const itineraryDetail = await this.itineraryService.createItineraryDetail(detail.date, result.id);

        await Promise.all(
          detail.itineraryItems.map(async (item) => {
            await this.itineraryService.createItineraryItem(item.startHour, item.endHour, item.detailName, itineraryDetail.id);
          })
        );
      })
    );

    return result;
  }
}
