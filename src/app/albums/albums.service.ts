import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { Album, AlbumDetail } from "@prisma/client";

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  async getAlbums(tripId: number): Promise<Album[]> {
    return this.prisma.album.findMany({
      where: {
        tripId,
      },
      include: {
        albumDetail: true,
      },
    });
  }

  async getAlbumDetails(albumId: number): Promise<AlbumDetail[]> {
    return this.prisma.albumDetail.findMany({
      where: {
        albumId,
      },
    });
  }

  async createAlbum(name: string, tripId: number): Promise<Album> {
    return this.prisma.album.create({
      data: {
        name,
        tripId,
      },
      include: {},
    });
  }

  async createAlbumDetail(name: string, albumId: number, userId: number, image: string): Promise<AlbumDetail> {
    return this.prisma.albumDetail.create({
      data: {
        userId,
        name,
        image,
        albumId,
      },
    });
  }

  async deleteAlbum(albumId: number): Promise<Album> {
    return this.prisma.album.delete({
      where: {
        id: albumId,
      },
    });
  }

  async deleteAlbumDetail(detailId: number): Promise<AlbumDetail> {
    return this.prisma.albumDetail.delete({
      where: {
        id: detailId,
      },
    });
  }
}


// model AlbumDetail {
//   id      Int    @id @default(autoincrement())
//   name    String
//   albumId Int
//   userId  Int
//   photo   Bytes  @db.LongBlob()
//
//   user  User  @relation(fields: [userId], references: [id])
//   album Album @relation(fields: [albumId], references: [id])
// }