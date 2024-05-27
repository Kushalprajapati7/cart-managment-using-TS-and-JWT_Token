import mongoose,{Types} from "mongoose";
import { IProfile } from "./profilrInterface";
import { IUser } from "./userInterface";
import { IProduct } from "./productInterface";

export interface ICart extends Document {
    _id?: Types.ObjectId;
    profileId: Types.ObjectId;
    userId: Types.ObjectId;
    items: Array<{
        productId: Types.ObjectId;
        quantity: number;
    }>;
    total: number;
}
