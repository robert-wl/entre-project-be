import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ImagesService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async saveImage(image: string): Promise<string> {
    const baseUrl = this.configService.get<string>("BACKEND_BASE_URL");
    const uuid = crypto.randomUUID();
    const result = await this.prisma.image.create({
      data: {
        image,
        uuid,
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
