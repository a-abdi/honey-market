import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/app/users/entities/user.entity';
import { CartProduct } from '../values/cart-product';

@Schema({timestamps: true})
export class Cart {
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  userIp: string;

  @Prop({type: [MongooseSchema.Types.ObjectId], ref: 'User'})
  user: MongooseSchema.Types.ObjectId | User;

  @Prop()
  product: CartProduct;

  @Prop()
  IsBought: boolean;
}

export type CartDocument = Cart & Document;

export const CartSchema = SchemaFactory.createForClass(Cart);
