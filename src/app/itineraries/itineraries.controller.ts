import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ItinerariesService } from "./itineraries.service";
import { AuthGuard } from "../auth/auth.guard";
import { CreateItineraryRequestDto } from "./dto/create-itinerary-request.dto";
import { Sender } from "src/decorators/sender.decorator";
import { User } from "@prisma/client";
import { EditItineraryDetailRequestDto } from "./dto/edit-itinerary-detail-request.dto";
import { ResponseValidationInterceptor } from "src/interceptors/response-validation.interceptor";
import { CreateItineraryResponseDTO } from "./dto/create-itinerary-response.dto";

@Controller("itineraries")
export class ItinerariesController {
  constructor(private itineraryService: ItinerariesService) {}

  @Post("/")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateItineraryResponseDTO))
  async createItinerary(@Sender() sender: User, @Body() dto: CreateItineraryRequestDto) {
    const result = await this.itineraryService.createItinerary(dto.startDate, dto.endDate, dto.tripId, sender.id);

    await Promise.all(
      dto.itineraryDetail.map(async (detail) => {
        const itineraryDetail = await this.itineraryService.createItineraryDetail(detail.date, result.id);

        await Promise.all(
          detail.itineraryItems.map(async (item) => {
            await this.itineraryService.createItineraryItem(item.startHour, item.endHour, item.detailName, itineraryDetail.id);
          }),
        );
      }),
    );

    return {
      result,
    };
  }

  @Get("/trip/:tripId")
  @UseGuards(AuthGuard)
  async getItineraryFromTrip(@Param("tripId") tripId: string) {
    const itinerary = await this.itineraryService.getItineraryFromTrip(+tripId);

    return {
      result: itinerary,
    };
  }

  @Post("/edit")
  async editItineraryDetail(@Body() dto: EditItineraryDetailRequestDto) {
    await this.itineraryService.editItineraryDetail(dto.id, dto.itineraryItems);

    return {
      result: "success",
    };
  }
}
