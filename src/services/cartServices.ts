import Cart from "../models/cart.Model";
import { ICart } from "../interfaces/cartInterface";

class CartServices {
    createCart = async(cart:ICart):Promise<ICart>=>{
        const newCart = new Cart(cart);
        return await newCart.save();
    }

    
    deleteCart = async (cartId: string, userId: string): Promise<boolean> =>{
        const deletedCart = await Cart.findOneAndDelete({ _id: cartId, userId: userId });
        return !!deletedCart;
    }
}

export default new CartServices();