import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import MongooseSchema from 'mongoose';
import { Errand } from './Errand.schema';
import { User } from './User.schema';

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  quatity: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Errand', required: true })
  errand: Errand;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const itemSchema = SchemaFactory.createForClass(Item);
