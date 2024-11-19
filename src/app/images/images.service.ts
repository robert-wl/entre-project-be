import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { v4 as uuid } from "uuid";

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async saveImage(image: string): Promise<string> {
    const baseUrl = this.configService.get<string>("BACKEND_BASE_URL");
    const uuidVal = uuid();
    const result = await this.prisma.image.create({
      data: {
        image,
        uuid: uuidVal,
      },
    });

    return `${baseUrl}/images/${result.uuid}`;
  }

  async getImage(uuid: string): Promise<string> {
    const image = await this.prisma.image.findFirst({
      where: {
        uuid,
      },
    });

    return image.image;
  }
}
