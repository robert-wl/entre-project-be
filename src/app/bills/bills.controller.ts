import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ResponseValidationInterceptor } from "../../interceptors/response-validation.interceptor";
import { Sender } from "../../decorators/sender.decorator";
import { User } from "@prisma/client";
import { BillsService } from "./bills.service";
import { CreateBillRequestDTO } from "./dto/create-bill-request.dto";
import { CreateBillResponseDTO } from "./dto/create-bill-response.dto";
import { GetBillsFromTripResponseDTO } from "./dto/get-bills-from-trip-response.dto";
import { GetBillDetailResponseDTO } from "./dto/get-bill-detail-response.dto";
import { ConfirmBillResponseDTO } from "./dto/confirm-bill-response.dto";
import { ConfirmBillRequestDTO } from "./dto/confirm-bill-request.dto";

@Controller("bills")
export class BillsController {
  constructor(private billsService: BillsService) {}

  @Post("/createBill")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateBillResponseDTO))
  async createBill(@Sender() sender: User, @Body() dto: CreateBillRequestDTO) {
    const result = await this.billsService.createBill(dto.description, dto.tripId, sender.id);

    if (dto.billDetail)
      await Promise.all(
        dto.billDetail.map((detail) => this.billsService.createBillDetail(result.id, detail.userId, detail.price, detail.quantity, detail.itemName)),
      );

    return {
      result,
    };
  }

  @Get("/getBills/:tripId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetBillsFromTripResponseDTO))
  async getBillsFromTrip(@Sender() sender: User, @Param("tripId") tripId: string) {
    const bills = await this.billsService.getBillsFromTrip(+tripId);

    const details = await this.billsService.getBillDetailWithUser(+tripId, sender.id);

    return {
      result: bills,
    };
  }

  @Get("/getBillDetail/:billId")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetBillDetailResponseDTO))
  async getBillDetail(@Param("billId") billId: string) {
    const result = await this.billsService.getBillDetail(Number.parseInt(billId));

    return {
      result,
    };
  }

  @Post("/confirm")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(ConfirmBillResponseDTO))
  async confirmBillPayment(@Body() dto: ConfirmBillRequestDTO) {
    await this.billsService.confirmBillPayment(dto.billDetailId);

    return {
      result: true,
    };
  }
}
