import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Bill, BillDetail } from "@prisma/client";

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  async createBill(description: string, tripId: number, ownerId: number): Promise<Bill> {
    return this.prisma.bill.create({
      data: {
        description,
        tripId,
        billOwnerId: ownerId,
        date: new Date(),
      },
    });
  }

  async createBillDetail(billId: number, userId: number, price: number, quantity: number, itemName: string): Promise<BillDetail> {
    return this.prisma.billDetail.create({
      data: {
        billId,
        userId,
        price,
        quantity,
        itemName,
        paid: false,
      },
    });
  }

  async getBillsFromTrip(tripId: number): Promise<Bill[]> {
    return this.prisma.bill.findMany({
      where: {
        tripId,
      },
      include: {
        billDetails: true,
        billOwner: true,
      },
    });
  }

  async getBillDetail(billId: number): Promise<BillDetail[]> {
    return this.prisma.billDetail.findMany({
      where: {
        billId,
      },
    });
  }

  async confirmBillPayment(billDetailId: number) {
    return this.prisma.billDetail.update({
      where: {
        id: billDetailId,
      },
      data: {
        paid: true,
      },
    });
  }
}
