import { Injectable } from "@nestjs/common";
import { Trip } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async createTrip(name: string, description: string, numberOfTravelers: number, ownerId: number): Promise<Trip> {
    return await this.prisma.trip.create({
      data: {
        name,
        description,
        ownerId,
        endDate: new Date(),
        startDate: new Date(),
      },
    });
  }

  async updateTrip(id: number, name: string, description: string): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
  }

  async getOwnerTrips(ownerId: number): Promise<Trip[]> {
    return this.prisma.trip.findMany({
      where: {
        ownerId: {
          equals: ownerId,
        },
      },
    });
  }

  async addTripMember(tripId: number, userId: number): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
