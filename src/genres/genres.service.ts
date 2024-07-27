import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from 'src/schemas/Genre.schema';
import { CreateGenreDto } from './dto/Genre.dto';
import { UpdateGenreDto } from './dto/UpdateGenre.dto';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

  getGenres() {
    return this.genreModel.find();
  }

  getGenreById(id: string) {
    return this.genreModel.findById(id);
  }

  createGenre(createGenreDto: CreateGenreDto) {
    const newGenre = new this.genreModel(createGenreDto);
    return newGenre.save();
  }

  updateGenre(id: string, updateGenreDto: UpdateGenreDto) {
    return this.genreModel.findByIdAndUpdate(id, updateGenreDto, { new: true });
  }

  deleteGenre(id: string) {
    return this.genreModel.findByIdAndDelete(id);
  }
}
