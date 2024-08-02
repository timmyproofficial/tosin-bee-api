import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenresModule } from './genres/genres.module';
import { AlbumsModule } from './albums/albums.module';
import { MediaModule } from './media/media.module';
import { EventsModule } from './events/events.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI'),
      }),
    }),
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
