import { Request, Response, NextFunction } from "express";
import User from '../models/user.model'
import authServices from "../services/authServices";
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response):Promise<void> => {
    try {
        const  userdata  = req.body;
    
        const newUser = await authServices.signUp(userdata);
        res.status(200).json({ message: "User registered successfully ", newUser })
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;
        const token = await authServices.login(username,password)
        res.status(200).json({ token: token, message: "Login Successful" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}