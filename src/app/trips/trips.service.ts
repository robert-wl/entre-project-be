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
        members: {
          connect: {
            id: ownerId,
          },
        },
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
    return this.prisma.trip.findMany({
      where: {
        OR: [{ ownerId: ownerId }, { members: { some: { id: ownerId } } }],
      },
      include: {
        members: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true } },
      },
    });
  }

  async getTripWithDetails(tripId: number): Promise<Trip> {
    return this.prisma.trip.findUnique({
      where: {
        id: tripId,
      },
      include: {
        members: { select: { id: true, name: true } },
        owner: { select: { id: true, name: true } },
        tripDetail: true,
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
