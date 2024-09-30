import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Trip } from "@prisma/client";

@Injectable()
export class TripsService {
  constructor(private prisma: PrismaService) {}

  async createTrip(name: string, description: string, ownerId: number): Promise<Trip> {
    return this.prisma.trip.create({
      data: {
        name,
        description,
        ownerId,
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

  async getMyTrips(ownerId: number): Promise<Trip[]> {
    return await this.prisma.trip.findMany({
      where: {
        OR: [{ ownerId: ownerId }, { members: { some: { id: ownerId } } }],
      },
      include: {
        members: {select: {id: true}},
      },
    });
  }

  async getTripWithDetails(tripId: number): Promise<Trip> {
    return this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        members: true,
        tripDetails: true,
        owner: {select: {id: true}}
      },
    });
  }

  async inviteTripMemberByEmail(tripId: number, email: string): Promise<Trip> {
    return this.prisma.trip.update({
      where: {
        id: tripId,
      },
      data: {
        members: {
          connect: {
            email: email,
          },
        },
      },
    });
  }
}
