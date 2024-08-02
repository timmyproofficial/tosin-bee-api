import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/Album.dto';
import { UpdateAlbumDto } from './dto/UpdateAlbum.dto';

@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  async getAlbums() {
    const albums = await this.albumsService.getAlbums();
    return {
      count: albums.length,
      result: albums,
    };
  }

  @Get(':id')
  async getAlbumById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findAlbum = await this.albumsService.getAlbumById(id);
    if (!findAlbum) throw new HttpException('Album not found', 404);

    return findAlbum;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedAlbum = await this.albumsService.updateAlbum(
      id,
      updateAlbumDto,
    );
    if (!updatedAlbum) throw new HttpException('Album not found', 400);

    return updatedAlbum;
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedAlbum = await this.albumsService.deleteAlbum(id);
    if (!deletedAlbum) throw new HttpException('Album not found', 404);

    return;
  }
}
