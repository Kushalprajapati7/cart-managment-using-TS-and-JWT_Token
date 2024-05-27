import mongoose, { Document, Model, Schema } from 'mongoose';
import { ICart } from '../interfaces/cartInterface';

const CartSchema: Schema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true 
    },
    profileId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true
    },
    items: [
        {
            _id:false,
            productId: {
                type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true
            },
            quantity: {
                type: Number, required: true
            }
        }
    ],
    total: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);
export default Cart;
