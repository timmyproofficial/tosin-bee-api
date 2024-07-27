import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Genre {
  @Prop({ required: true })
  name: string;
}

export const genreSchema = SchemaFactory.createForClass(Genre);
