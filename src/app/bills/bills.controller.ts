import { Body, Controller, Get, Param, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ResponseValidationInterceptor } from "../../interceptors/response-validation.interceptor";
import { Sender } from "../../decorators/sender.decorator";
import { User } from "@prisma/client";
import { BillsService } from "./bills.service";
import { CreateBillRequestDTO } from "./dto/create-bill-request.dto";
import { CreateBillResponseDTO } from "./dto/create-bill-response.dto";
import { GetBillsFromTripResponseDTO } from "./dto/get-bills-from-trip-response.dto";
import { GetCompleteBillResponseDTO } from "./dto/get-complete-bill-response.dto";
import { ConfirmBillResponseDTO } from "./dto/confirm-bill-response.dto";

@Controller("bills")
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Post("/")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateBillResponseDTO))
  async createBill(@Sender() sender: User, @Body() dto: CreateBillRequestDTO) {
    const result = await this.billsService.createBill(dto.name, dto.tripId, sender.id);

    if (!dto.billDetail) {
      return { result };
    }

    await Promise.all(
      dto.billDetail.map(async (detail) => {
        const totalPrice = detail.billItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        await this.billsService.createBillDetail(result.id, detail.userId, totalPrice);

        if (!detail.billItems) return;

        await Promise.all(
          detail.billItems.map(async (item) => {
            await this.billsService.createBillItem(result.id, item.price, item.quantity, item.itemName);
          }),
        );
      }),
    );

    return { result };
  }

  @Get("/trip/:tripId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetBillsFromTripResponseDTO))
  async getBillsFromTrip(@Param("tripId") tripId: string) {
    const bills = await this.billsService.getBillsFromTrip(+tripId);

    return {
      result: bills,
    };
  }

  @Get("/:billId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetCompleteBillResponseDTO))
  async getCompleteBill(@Param("billId") billId: string) {
    const result = await this.billsService.getCompleteBill(Number.parseInt(billId));

    return {
      result,
    };
  }

  @Put("/confirm/:billDetailId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(ConfirmBillResponseDTO))
  async confirmBillPayment(@Param("billDetailId") billDetailId: string) {
    await this.billsService.confirmBillPayment(+billDetailId);

    return {
      result: true,
    };
  }
}
