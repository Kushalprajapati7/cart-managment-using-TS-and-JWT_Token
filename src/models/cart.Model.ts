import mongoose, {Document,Model,Schema}from "mongoose";

export interface ICart extends Document{
    profileId: any;
    userId:string;
    productId:string;
    items: Array<{
        productId:string;
        quantity:number;
        price:number;
        name:string;
        description: string;
    }>;
    total:number
}

const CartSchema: Schema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    },
    profileId:{
        type:Schema.Types.ObjectId, ref:'Profile', required: true
    },
    items:[
        {
            productId :{
                type:String, ref:'Product',required:true
            },
            quantity :{
                type:Number,required:true
            },
            price :{
                type:Number, required:true
            },
            name :{
                type:String,required:true
            },
            description :{
                type:String,required:true
            }

        }
    ],
    total: {type:Number, required:true, default: 0 }
},{
    timestamps:true,
}
)

const Cart:Model<ICart> = mongoose.model<ICart>('Cart',CartSchema);
export default Cart;
