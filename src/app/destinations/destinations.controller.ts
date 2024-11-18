import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { DestinationsService } from "./destinations.service";
import { ResponseValidationInterceptor } from "src/interceptors/response-validation.interceptor";
import { CreateDestinationResponseDTO } from "./dto/create-destination-response.dto";
import { CreateDestinationRequestDto } from "./dto/create-destination-request.dto";
import { AuthGuard } from "../auth/auth.guard";
import { GetDestinationsFromTripResponseDTO } from "./dto/get-destinations-from-trip-response.dto";
import { Sender } from "src/decorators/sender.decorator";
import { User } from "@prisma/client";
import { DeleteDestinationRequestDTO } from "./dto/delete-destination-request.dto";
import { DeleteDestinationResponseDTO } from "./dto/delete-destination-response.dto";
import { GetDestinationResponseDTO } from "./dto/get-destination-response.dto";
import { EditDestinationResponseDTO } from "./dto/edit-destination-response.dto";
import { EditDestinationRequestDTO } from "./dto/edit-destination-request.dto";

@Controller("destinations")
export class DestinationsController {
  constructor(private destinationsService: DestinationsService) {}

  @Post("/")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateDestinationResponseDTO))
  async createDestination(@Sender() sender: User, @Body() dto: CreateDestinationRequestDto) {
    try {
      const result = await this.destinationsService.createDestination(dto.destination, dto.notes, dto.image, dto.tripId, sender.id);
      return { result };
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/delete")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(DeleteDestinationResponseDTO))
  async deleteDestination(@Body() dto: DeleteDestinationRequestDTO) {
    const result = await this.destinationsService.deleteDestination(dto.destinationId);
    return { result };
  }

  @Get("/trip/:tripId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetDestinationsFromTripResponseDTO))
  async getDestinationsFromTrip(@Param("tripId") tripId: string) {
    const result = await this.destinationsService.getDestinationsFromTrip(+tripId);
    return { result };
  }

  @Get("/:destinationId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetDestinationResponseDTO))
  async getDestination(@Param("destinationId") destinationId: string) {
    const result = await this.destinationsService.getDestination(+destinationId);
    return { result };
  }

  @Post("/edit")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(EditDestinationResponseDTO))
  async editDestination(@Body() dto: EditDestinationRequestDTO) {
    const result = await this.destinationsService.editDestination(dto.destinationId, dto.destination, dto.image, dto.notes);
    return { result };
  }
}
