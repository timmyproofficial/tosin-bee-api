import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresModule } from './genres/genres.module';
import { AlbumsModule } from './albums/albums.module';
import { MediaModule } from './media/media.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://timmyshow96:lBQgrgUGPEUAfSBw@cluster0.fch9y4r.mongodb.net/tosinBeeDb?retryWrites=true&w=majority&appName=Cluster0',
    ),
    GenresModule,
    AlbumsModule,
    MediaModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
