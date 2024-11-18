import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  // async createAlbum(albumName: string, ownerId: number): Promise<Album> {
  //   return this.prisma.album.create({
  //     data: {
  //       albumName,
  //       ownerId,
  //     },
  //     include: {
  //       owner: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
