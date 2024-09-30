import { Body, Controller, Post, Request, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ResponseValidationInterceptor } from "../interceptors/response-validation.interceptor";
import { CreateTripRequestDTO } from "./dto/create-trip-request.dto";
import { TripsService } from "./trips.service";
import { CreateTripResponseDTO } from "./dto/create-trip-response.dto";

@Controller("trips")
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post("/")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateTripResponseDTO))
  async createTrip(@Request() req, @Body() dto: CreateTripRequestDTO) {
    const userId = req.user.id;
    const result = await this.tripsService.createTrip(dto.name, dto.description, dto.numberOfTravelers, userId);

    return {
      result,
    };
  }
}
