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
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/Genre.dto';
import { UpdateGenreDto } from './dto/UpdateGenre.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Genres')
@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch Genres' })
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
                description: "Genre's name.",
                example: 'RnB',
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
  async getGenres() {
    const genres = await this.genresService.getGenres();
    return {
      count: genres.length,
      result: genres,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch Single Genre' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Valid objectID',
    example: '66ac252721c95e1f23ccc210',
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
  async getGenreById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Genre not found', 404);

    const findGenre = await this.genresService.getGenreById(id);
    if (!findGenre) throw new HttpException('Genre not found', 404);

    return findGenre;
  }

  @Post()
  @ApiOperation({ summary: 'Create Genre' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'RnB',
          description: 'Name of the Genre.',
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
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.createGenre(createGenreDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Genre' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'A unique and valid ObjectId',
    example: '66ac252721c95e1f23ccc210',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Apala Gospel',
          description: 'Name of the Genre.',
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
  async updateGenre(
    @Param('id') id: string,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const updatedGenre = await this.genresService.updateGenre(
      id,
      updateGenreDto,
    );
    if (!updatedGenre) throw new HttpException('Genre not found', 400);

    return updatedGenre;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Genre' })
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
  async deleteGenre(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedGenre = await this.genresService.deleteGenre(id);
    if (!deletedGenre) throw new HttpException('Genre not found', 404);

    return;
  }
}
