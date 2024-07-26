import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Album {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  releasedYear: number;
}

export const albumSchema = SchemaFactory.createForClass(Album);
