import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Destination } from "@prisma/client";

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) {}

  async createDestination(destination: string, notes: string, image: string, tripId: number, ownerId: number): Promise<Destination> {
    return this.prisma.destination.create({
      data: {
        destination,
        notes,
        image,
        tripId,
        destinationOwnerId: ownerId,
      },
      include: {
        destinationOwner: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async getDestinationsFromTrip(tripId: number): Promise<Destination[]> {
    return this.prisma.destination.findMany({
      where: {
        tripId,
      },
    });
  }

  async deleteDestination(destinationId: number): Promise<Destination> {
    return this.prisma.destination.delete({
      where: {
        id: destinationId,
      },
    });
  }

  async getDestination(destinationId: number): Promise<Destination> {
    return this.prisma.destination.findFirst({
      where: {
        id: destinationId,
      },
    });
  }

  async editDestination(destinationId: number, destination: string, image: string, notes: string): Promise<Destination> {
    return this.prisma.destination.update({
      where: {
        id: destinationId,
      },
      data: {
        destination: destination,
        notes: notes,
        image: image,
      },
    });
  }
}
