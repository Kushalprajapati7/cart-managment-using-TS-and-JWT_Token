import  { Request, Response } from "express";
import Cart from "../models/cart.Model";
import { ICart } from "../interfaces/cartInterface"
import CustomRequest from "../types/customeRequest";
import Product from "../models/product.model";
import { generatePDF } from '../utils/pdfGenerator';
import fs from 'fs';
import { Types } from "mongoose";
import cartServices from "../services/cartServices";

export const createCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as CustomRequest).userId;
        const cart:ICart = req.body;
        cart.userId = new Types.ObjectId(userId);
        
        let total = 0;
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }

            total += product?.price * item.quantity;
        }
        cart.total = total;

        const newCart = await cartServices.createCart(cart)

        res.status(201).json(newCart);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as CustomRequest).userId;
       const cartId = req.params.id;
       const cart:ICart = req.body;
        // Fetch the existing cart
        const existingCart = await Cart.findById(cartId);
        if (!existingCart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }

        // Ensure the cart belongs to the current user
        if (!existingCart.userId.equals(userId)) {
            res.status(403).json({ message: 'Unauthorized' });
            return;
        }

        // Update the cart items and recalculate the total price
        let total = 0;
        const updatedItems = [];
        for (const item of cart.items) {
            const product = await Product.findById(item.productId);
            if (!product) {
                throw new Error(`Product with ID ${item.productId} not found`);
            }
            total += product.price * item.quantity;
            updatedItems.push({
                productId: new Types.ObjectId(item.productId),
                quantity: item.quantity
            });
        }

        existingCart.items = updatedItems;
        existingCart.total = total;

        const updatedCart = await existingCart.save();

        res.status(200).json(updatedCart);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteCart = async (req: Request, res: Response) => {
    try {
        const userId:any = (req as CustomRequest).userId;
        const cartId: string = req.params.id;

        const isDeleted = await cartServices.deleteCart(cartId, userId);
        if (!isDeleted) {
            res.status(404).json({ message: 'Cart not found or unauthorized' });
            return;
        }

        res.status(200).json({ message: 'Cart Deleted' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}    

export const showCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as CustomRequest).userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const cart: ICart[] = await Cart.find({ userId });
        res.status(200).json(cart)

    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}


export const showCartById = async (req: CustomRequest, res: Response): Promise<void> => {
    const { id } = req.params;
    // console.log(id);
    let userId = req.userId;
    // console.log(sessionUserId);


    try {
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const cart: ICart | null = await Cart.findById(id);
        if (!cart) {
            res.status(404).json({ message: 'Cart not found' });
            return;
        }

        if (userId === cart.userId?.toString()) {
            res.status(200).json(cart);
        }
        else {

            res.status(500).json({ message: "No Cart find For logged User" });
        }

        console.log(`UserID of the cart: ${cart.userId}`);



    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const downloadCartPDF = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ message: 'Unauthorized: No user logged in.' });
            return;
        }
        const cart = await Cart.findById(req.params.cartId);
        if (!cart) {
            res.status(404).send('Cart not found');
            return;
        }
        
        if (userId === cart.userId?.toString()) {


            const outputDir = './output';
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir);
            }

            const pdfPath = `${outputDir}/Cart-${cart._id}.pdf`;
            await generatePDF(cart, pdfPath);

            res.download(pdfPath, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    res.status(500).send('Error downloading file');
                }
            });
        }
        else{
            res.status(500).json({ message: "No Cart find For logged User" });
        }
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF' });
    }
};
