import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ItinerariesService {
  constructor(private prisma: PrismaService) {}

  async createItinerary(startDate: Date, endDate: Date, tripId: number, itineraryOwnerId: number) {
    return this.prisma.itinerary.create({
      data: {
        startDate,
        endDate,
        tripId,
        itineraryOwnerId,
      },
    });
  }

  async createItineraryDetail(date: Date, itineraryId: number) {
    return this.prisma.itineraryDetail.create({
      data: {
        date,
        itineraryId,
      },
    });
  }

  async createItineraryItem(startHour: string, endHour: string, detailName: string, itineraryDetailId: number) {
    return this.prisma.itineraryItem.create({
      data: {
        startHour,
        endHour,
        detailName,
        itineraryDetailId,
      },
    });
  }

  async getItinerariesFromTrip(tripId: number) {
    return this.prisma.itinerary.findMany({
      where: {
        tripId,
      },
    });
  }
}
