import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Market {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop()
  isActive: boolean;
}

export const marketSchema = SchemaFactory.createForClass(Market);
