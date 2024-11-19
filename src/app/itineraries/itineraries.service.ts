import { Injectable } from "@nestjs/common";
import { ItineraryItem } from "@prisma/client";
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

  async getItineraryFromTrip(tripId: number) {
    return this.prisma.itinerary.findFirst({
      where: {
        tripId,
      },
      include: {
        itineraryDetails: {
          include: {
            itineraryItems: {
              orderBy: {
                startHour: "asc",
              },
            },
          },
          orderBy: {
            date: "asc",
          },
        },
      },
    });
  }

  async editItineraryDetail(
    itineraryDetailId: number,
    itineraryItems: {
      id?: number;
      startHour: string;
      endHour: string;
      detailName: string;
    }[],
  ) {
    const upsertPromises = itineraryItems.map((item) =>
      this.prisma.itineraryItem.upsert({
        where: { id: item.id || -1 },
        update: {
          startHour: item.startHour,
          endHour: item.endHour,
          detailName: item.detailName,
        },
        create: {
          startHour: item.startHour,
          endHour: item.endHour,
          detailName: item.detailName,
          itineraryDetailId,
        },
      }),
    );

    return Promise.all(upsertPromises);
  }
}
