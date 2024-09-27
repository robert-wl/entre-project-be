import { IsNotEmpty } from 'class-validator';

export class CreateTripDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    ownerId: number;
}
