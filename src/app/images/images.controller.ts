import { Controller, Get, Param, Res } from "@nestjs/common";
import { ImagesService } from "./images.service";
import { Response } from "express";

@Controller("images")
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get("/:id")
  async getImage(@Param("id") id: string, @Res() res: Response) {
    const image = await this.imagesService.getImage(id);

    if (!image) {
      return {
        statusCode: 404,
        message: "Image not found",
      };
    }

    const matches = image.match(/^data:(.+?);base64,(.+)$/);
    if (!matches) {
      throw new Error("Invalid Base64 format");
    }
    const mimeType = matches[1];
    const data = matches[2];

    const buffer = Buffer.from(data, "base64");

    res.setHeader("Content-Type", mimeType);
    res.send(buffer);
  }
}
