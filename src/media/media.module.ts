import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, mediaSchema } from 'src/schemas/Media.schema';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: mediaSchema }]),
  ],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
