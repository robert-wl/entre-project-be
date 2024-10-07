import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { DestinationsService } from './destinations.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseValidationInterceptor } from 'src/interceptors/response-validation.interceptor';
import { CreateDestinationResponseDTO } from './dto/create-destination-response.dto';
import { CreateDestinationRequestDto } from './dto/create-destination-request.dto';

@Controller('destinations')
export class DestinationsController {
    constructor(private destinationsService: DestinationsService) { }

    @Post('/create-destination')
    @UseGuards(AuthGuard)
    @UseInterceptors(new ResponseValidationInterceptor(CreateDestinationResponseDTO))
    async createDestination(@Body() dto: CreateDestinationRequestDto) {
        const result = await this.destinationsService.createDestination(dto.destination, dto.notes, dto.image);
        return {
            result
        };
    }
}
