import { Request, Response } from "express";
import Profile, { IProfile } from '../models/profile.model'
import CustomRequest from "../types/customeRequest";
import Cart from "../models/cart.Model";

export const profileCreate = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        // console.log("Hey Pr");

        const userId = req.userId;
        const { name, dob, email, gender } = req.body
        const newProfile: IProfile = new Profile({ userId, name, dob, email, gender });

        await newProfile.save();
        res.status(201).json(newProfile);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

}


export const showAllProfiles = async (req: CustomRequest, res: Response): Promise<void> => {
    try {

        // const token = req.headers.authorization?.split(' ')[1];
        // console.log(token);
        
        const userId = req.userId;
        console.log("USerID",userId);
        
        const profile = await Profile.find( {userId} );
        console.log(profile);
        

        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }

        // Send profile in the response
        res.status(200).json(profile);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteProfile = async (req: CustomRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId;
        const id = req.params.id;

        const profile: IProfile | null = await Profile.findOne({ userId });

        console.log(profile);

        if (!profile) {
            res.status(404).json({ message: 'Profile not found' });
            return;
        }

        if (profile._id.toString() !== id) {
            res.status(403).json({ message: 'You are not authorized to delete this profile' });
            return;
        }

        await Cart.findByIdAndDelete(id)
        await Profile.findByIdAndDelete(id);

        res.status(200).json({ message: 'Profile Deleted' });


    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProfile = async (req:CustomRequest, res:Response):Promise<void>=>{
    try{    

        const userId = req.userId;
        const id = req.params.id;
        
        const profile = await Profile.findByIdAndUpdate(id, req.body, { new: true });
        console.log(profile);

        if(!profile){
            res.status(404).json({ message: 'Profile not found' });
            return;
        }
        res.status(200).json({message:"Profile Updated",data:profile })
        
    }
    catch(error:any){
        res.status(500).json({ message: error.message })
    }
}