import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import MongooseSchema from 'mongoose';
import { Genre } from './Genre.schema';
import { Album } from './Album.schema';

@Schema({ timestamps: true })
export class Media {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  appleLink: string;

  @Prop({ required: true })
  audiomackLink: string;

  @Prop({ required: true })
  boomplayLink: string;

  @Prop({ required: true })
  spotifyLink: string;

  @Prop({ required: true })
  youtubeLink: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Genre', required: true })
  genre: Genre;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Album', required: true })
  album: Album;
}

export const mediaSchema = SchemaFactory.createForClass(Media);
