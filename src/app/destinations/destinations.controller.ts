import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { ResponseValidationInterceptor } from 'src/interceptors/response-validation.interceptor';
import { CreateDestinationResponseDTO } from './dto/create-destination-response.dto';
import { CreateDestinationRequestDto } from './dto/create-destination-request.dto';
import { AuthGuard } from '../auth/auth.guard';
import { GetDestinationsFromTripResponseDTO } from './dto/get-destinations-from-trip-response.dto';

@Controller('destinations')
export class DestinationsController {
    constructor(private destinationsService: DestinationsService) { }

    @Post('/')
    @UseGuards(AuthGuard)
    @UseInterceptors(new ResponseValidationInterceptor(CreateDestinationResponseDTO))
    async createDestination(@Body() dto: CreateDestinationRequestDto) {
        const result = await this.destinationsService.createDestination(dto.destination, dto.notes, dto.image, dto.tripId);
        return {
            result
        };
    }

    @Get("/trip/:tripId")
    @UseGuards(AuthGuard)
    @UseInterceptors(new ResponseValidationInterceptor(GetDestinationsFromTripResponseDTO))
    async getBillsFromTrip(@Param("tripId") tripId: string) {
        const result = await this.destinationsService.getDestinationsFromTrip(+tripId);
        return {
            result: result
        };
    }
}
