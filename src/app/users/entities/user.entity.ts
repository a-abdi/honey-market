import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema} from "mongoose";

@Schema({ timestamps: true })
export class User {
    _id: MongooseSchema.Types.ObjectId;

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({isRequired: true, unique: true})
    phoneNumber: string;

    @Prop()
    address: string;

    @Prop()
    postalCode: string;

    @Prop()
    city: string;

    @Prop()
    password: string;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
