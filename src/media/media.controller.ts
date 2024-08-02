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
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/Media.dto';
import { UpdateMediaDto } from './dto/UpdateMedia.dto';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Get()
  async getMedia() {
    const media = await this.mediaService.getMedia();
    return {
      count: media.length,
      result: media,
    };
  }

  @Get(':id')
  async getMediaById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findMedia = await this.mediaService.getMediaById(id);
    if (!findMedia) throw new HttpException('Media not found', 404);

    return findMedia;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediaService.createMedia(createMediaDto);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateMedia(
    @Param('id') id: string,
    @Body() updateMediaDto: UpdateMediaDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedMedia = await this.mediaService.updateMedia(
      id,
      updateMediaDto,
    );
    if (!updatedMedia) throw new HttpException('Media not found', 400);

    return updatedMedia;
  }

  @Delete(':id')
  async deleteMedia(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedMedia = await this.mediaService.deleteMedia(id);
    if (!deletedMedia) throw new HttpException('Media not found', 404);

    return;
  }
}
