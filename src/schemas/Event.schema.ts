import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  venue: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  eventDate: string;

  @Prop({ required: true })
  eventTime: string;
}

export const eventSchema = SchemaFactory.createForClass(Event);
