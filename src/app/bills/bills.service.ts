import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Bill, BillDetail, BillItem } from "@prisma/client";

@Injectable()
export class BillsService {
  constructor(private prisma: PrismaService) {}

  async createBill(name: string, tripId: number, ownerId: number): Promise<Bill> {
    return this.prisma.bill.create({
      data: {
        name,
        tripId,
        billOwnerId: ownerId,
        date: new Date(),
      },
    });
  }

  async createBillDetail(billId: number, userId: number, totalPrice: number): Promise<BillDetail> {
    return this.prisma.billDetail.create({
      data: {
        billId,
        userId,
        totalPrice,
        paid: false,
      },
    });
  }

  async createBillItem(billDetailId: number, price: number, quantity: number, itemName: string): Promise<BillItem> {
    return this.prisma.billItem.create({
      data: {
        billDetailId,
        price,
        quantity,
        itemName,
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

  async getCompleteBill(billId: number): Promise<Bill> {
    return this.prisma.bill.findUnique({
      where: {
        id: billId,
      },
      include: {
        billDetails: {
          include: {
            billItems: true,
          },
        },
        billOwner: true,
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
