import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenresModule } from './genres/genres.module';
import { AlbumsModule } from './albums/albums.module';
import { MediaModule } from './media/media.module';
import { EventsModule } from './events/events.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://timmyshow96:j4JaGnCEDVRENIsT@cluster0.z79rmwr.mongodb.net/tosinBeeDb?retryWrites=true&w=majority&appName=Cluster0',
    ),
    GenresModule,
    AlbumsModule,
    MediaModule,
    EventsModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
