import mongoose,{Types} from "mongoose";

export interface IProduct{
    save(): unknown;
    _id?:Types.ObjectId;
    name:string,
    description:string,
    price:number,
    stock:number,
}