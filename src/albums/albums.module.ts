import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Album, albumSchema } from 'src/schemas/Album.schema';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Album.name, schema: albumSchema }]),
  ],
  providers: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
