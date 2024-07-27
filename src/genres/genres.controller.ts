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

@Controller('genres')
export class GenresController {
  constructor(private genresService: GenresService) {}

  @Get()
  getGenres() {
    return this.genresService.getGenres();
  }

  @Get(':id')
  async getGenreById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Genre not found', 404);

    const findGenre = await this.genresService.getGenreById(id);
    if (!findGenre) throw new HttpException('Genre not found', 404);

    return findGenre;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.createGenre(createGenreDto);
  }

  @Patch(':id')
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
  async deleteGenre(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 404);

    const deletedGenre = await this.genresService.deleteGenre(id);
    if (!deletedGenre) throw new HttpException('Genre not found', 404);

    return;
  }
}
