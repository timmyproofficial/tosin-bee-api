import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import MongooseSchema from 'mongoose';
import { User } from './User.schema';
import { Market } from './Market.schema';
import { Item } from './Item.schema';

@Schema({ timestamps: true })
export class Errand {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Market', required: true })
  market: Market;

  @Prop([
    {
      item: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Item',
        required: true,
      },
    },
  ])
  errandList: { item: Item }[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const errandSchema = SchemaFactory.createForClass(Errand);
