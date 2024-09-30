import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ResponseValidationInterceptor } from "../interceptors/response-validation.interceptor";
import { CreateTripRequestDto } from "./dto/create-trip-request.dto";
import { TripsService } from "./trips.service";
import { CreateTripResponseDTO } from "./dto/create-trip-response.dto";
import { GetMyTipsResponseDTO } from "./dto/get-my-trips-response.dto";
import { Sender } from "../../decorators/sender.decorator";
import { User } from "@prisma/client";

@Controller("trips")
export class TripsController {
  constructor(private tripsService: TripsService) {}

  @Post("/createTrip")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateTripResponseDTO))
  async createTrip(@Sender() sender: User, @Body() dto: CreateTripRequestDto) {
    const result = await this.tripsService.createTrip(dto.name, dto.description, sender.id);

    return {
      result,
    };
  }

  @Get("/getMyTrips")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetMyTipsResponseDTO))
  async getMyTrips(@Sender() sender: User) {
    const result = await this.tripsService.getMyTrips(sender.id);
    console.log(result);

    return {
      result,
    };
  }
}
