import { Request,Response,NextFunction } from "express";
import User from '../models/user.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signUp = async (req:Request, res:Response) =>{
    try{
        console.log('hey');
        
        const {username, password} = req.body;
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashPass })
        // console.log(newUser);
        await newUser.save();
        res.status(200).json({message: "User registered successfully "})
    }
    catch(error:any){
        res.status(500).json({ message: error.message })
    }

}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(404).json({ message: "User not found. Sign up here." });
            return 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Password is incorrect." });
            return 
        }

        const token = jwt.sign({ userId: user._id }, 'KushalP', { expiresIn: '1h' })

        res.status(200).json({ token: token, message: "Login Successful" });
    } catch (error:any) {
        res.status(500).json({ message: error.message });
    }
}