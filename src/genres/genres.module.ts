import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre, genreSchema } from 'src/schemas/Genre.schema';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: genreSchema }]),
  ],
  providers: [GenresService],
  controllers: [GenresController],
})
export class GenresModule {}
