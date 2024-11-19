import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";
import { ResponseValidationInterceptor } from "../../interceptors/response-validation.interceptor";
import { CreateAlbumResponseDTO } from "./dto/create-album.response.dto";
import { CreateAlbumRequestDTO } from "./dto/create-album.request.dto";
import { AlbumsService } from "./albums.service";
import { Sender } from "../../decorators/sender.decorator";
import { User } from "@prisma/client";
import { CreateAlbumDetailRequestDTO } from "./dto/create-album-detail.request.dto";
import { CreateAlbumDetailResponseDTO } from "./dto/create-album-detail.response.dto";
import { GetAlbumsResponseDTO } from "./dto/get-albums.response.dto";
import { GetAlbumDetailsResponseDTO } from "./dto/get-album-details.response.dto";
import { DeleteAlbumDetailResponseDTO } from "./dto/delete-album-detail.response.dto";

@Controller("albums")
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Get("/")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetAlbumsResponseDTO))
  async getAlbums(@Query("tripId") tripId: string) {
    const result = await this.albumService.getAlbums(+tripId);
    return { result };
  }

  @Post("/")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateAlbumResponseDTO))
  async createAlbum(@Body() dto: CreateAlbumRequestDTO) {
    const result = await this.albumService.createAlbum(dto.name, dto.tripId);
    return { result };
  }

  @Get("/:id/details")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(GetAlbumDetailsResponseDTO))
  async getAlbumWithDetails(@Param("id") id: string) {
    const result = await this.albumService.getAlbumWithDetails(+id);
    return { result };
  }

  @Post("/detail")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(CreateAlbumDetailResponseDTO))
  async createAlbumDetail(@Sender() user: User, @Body() dto: CreateAlbumDetailRequestDTO) {
    const result = await this.albumService.createAlbumDetail(dto.name, dto.albumId, user.id, dto.image);
    return { result };
  }

  @Delete("/detail/:id")
  @UseGuards(AuthGuard)
  @UseInterceptors(new ResponseValidationInterceptor(DeleteAlbumDetailResponseDTO))
  async deleteAlbum(@Param("id") detailId: string) {
    const result = await this.albumService.deleteAlbumDetail(+detailId);
    return { result };
  }
}
