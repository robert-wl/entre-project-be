import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DestinationsService {
  constructor(private prisma: PrismaService) { }

    async createDestination(destination: string, notes: string, image: File) {

    }

}