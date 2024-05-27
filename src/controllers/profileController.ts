import { Request, Response } from "express";
import Profile from '../models/profile.model'
import CustomRequest from "../types/customeRequest";
import profileServices from "../services/profileServices";

export const profileCreate = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as CustomRequest).userId;
        const profile = req.body;
        profile.userId = userId;

        const newProfile = await profileServices.createProfile(profile)

        res.status(201).json(newProfile);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }

}


export const showAllProfiles = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = (req as CustomRequest).userId;
        const profiles = await profileServices.showAllProfiles();

        const userProfile = profiles.filter((user: any) => user.userId == userId);
        if (userProfile.length ===0) {
            res.status(404).json({ message: "Profile Not found for this User" })
            return
        }
        res.status(200).json(userProfile);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const showAllProfileById = async (req: Request, res: Response): Promise<void> => {
    try {

        const profileId = req.params.id;
        const userId = (req as CustomRequest).userId;

        const allprofiles = await profileServices.showAllProfiles();

        const userProfile = allprofiles.filter((user: any) => user.userId == userId);

        if (userProfile.length === 0) {
            res.status(404).json({ message: "Profile Not found for this User" })
            return
        }
        const profile = userProfile.find((user: any) => user._id == profileId)

        if (!profile) {
            res.status(404).json({ message: "Profile Not found " })
            return
        }

        res.status(200).json(profile);
    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}


export const deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as CustomRequest).userId;

        const profileId = req.params.id;
        const allprofiles = await profileServices.showAllProfiles();

        const userProfile = allprofiles.filter((user: any) => user.userId == userId);

        if (userProfile.length === 0) {
            res.status(404).json({ message: "Profile Not found for this User" })
            return
        }

        const profile = userProfile.map((userProfile) => userProfile._id?.toString() === profileId)
        if (profile.includes(false)) {
            res.status(404).json({ message: "Profile Not found for this User" })
            return
        }

        await profileServices.deleteProfile(profileId)
        res.status(200).json({ message: 'Profile Deleted' });


    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {

        const userId = (req as CustomRequest).userId;
        const profileId = req.params.id;
        const profileData = req.body;

        const profileByUser = await Profile.find({ userId });
        if (!profileByUser) {
            res.status(404).json({ message: "Profile Not found for this User" })
            return
        }

        const profile = profileByUser.map((user) => user._id.toString() === profileId)

        if (!profile.includes(false)) {
            res.status(404).json({ message: "Profile Not found" })
            return
        }
        const updatedProfile = await profileServices.updateProfile(profileId, profileData)
        res.status(200).json({ message: "Profile Updated", data: updatedProfile })

    }
    catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}