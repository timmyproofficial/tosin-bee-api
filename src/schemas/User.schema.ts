import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  isPhoneVerified: boolean;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  walletBalance: number;

  @Prop()
  isActive: boolean;

  @Prop({ required: true })
  terms_condition: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
