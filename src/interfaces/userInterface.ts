import mongoose,{Types} from "mongoose";

export interface IUser{
    save(): unknown;
    _id?:Types.ObjectId;
    username:string;
    password:string;
}