import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Destination } from "@prisma/client";

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) { }

    async createDestination(destination: string, notes: string, image: string, tripId: number): Promise<Destination> {
      return this.prisma.destination.create({
        data: {
          name: destination,
          description: notes,
          photo: Buffer.from(image, 'base64'),
          tripId
        }
      })
    }

    async getDestinationsFromTrip(tripId: number): Promise<Destination[]> {
      return this.prisma.destination.findMany({
        where: {
          tripId
        }
      })
    }

}