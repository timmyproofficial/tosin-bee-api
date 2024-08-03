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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch Albums' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    schema: {
      type: 'object',
      properties: {
        count: {
          type: 'number',
          description: 'The length of the result',
          example: 4,
        },
        result: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              _id: {
                type: 'string',
                description: 'A unique objectId',
                example: '66acfdb89cf7a052700758ad',
              },
              name: {
                type: 'string',
                description: 'Album name.',
                example: 'Testimony',
              },
              releasedYear: {
                type: 'number',
                description: "Album's released year.",
                example: 2015,
              },
              createdAt: {
                type: 'string',
                description: 'Date & Time this record was created',
                example: '2024-08-02T15:39:36.220Z',
              },
              updatedAt: {
                type: 'string',
                description: 'Date & Time this record was updated',
                example: '2024-08-02T15:39:36.220Z',
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server code',
  })
  async getAlbums() {
    const albums = await this.albumsService.getAlbums();
    return {
      count: albums.length,
      result: albums,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch Single Album' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Valid objectID',
    example: '66acfdcd9cf7a052700758af',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Ok',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getAlbumById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const findAlbum = await this.albumsService.getAlbumById(id);
    if (!findAlbum) throw new HttpException('Album not found', 404);

    return findAlbum;
  }

  @Post()
  @ApiOperation({ summary: 'Create Album' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Single',
          description: 'Name of the Album.',
        },
        releasedYear: {
          type: 'number',
          example: 2058,
          description: 'The year the album was released.',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  @UsePipes(new ValidationPipe())
  createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Album' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'A unique and valid ObjectId',
    example: '66acfdcd9cf7a052700758af',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Single',
          description: 'Name of the Album.',
        },
        releasedYear: {
          type: 'number',
          example: 2058,
          description: 'The year the album was released.',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
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
  @ApiOperation({ summary: 'Delete Album' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'A unique and valid ObjectId',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async deleteAlbum(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedAlbum = await this.albumsService.deleteAlbum(id);
    if (!deletedAlbum) throw new HttpException('Album not found', 404);

    return;
  }
}
