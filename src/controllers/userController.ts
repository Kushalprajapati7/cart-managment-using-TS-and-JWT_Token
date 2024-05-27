import { Request, Response } from 'express'
import User from '../models/user.model'
import { IUser } from '../interfaces/userInterface';
import userServices from '../services/userServices';


export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: IUser[] = await userServices.getAllUsers();
        res.status(200).json(users)
    }
    catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user: IUser | null = await userServices.getUserById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser: IUser = await userServices.updateUserById(id,userData)
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(updatedUser);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await userServices.deleteUserById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        res.status(200).json({message: "User Deleted Succesfully "});
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}