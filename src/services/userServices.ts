import User from "../models/user.model";
import { IUser } from "../interfaces/userInterface";

class UserServices{
     getAllUsers = async():Promise<IUser[]> =>{
        const users:IUser[] = await User.find();
        return users
     }

     getUserById = async(userId:string):Promise<IUser>=>{
        const user:any =  await User.findById(userId)
        return user
     }

     updateUserById =async(userId:string, userdata:IUser):Promise<IUser>=>{
        const updatedUser:any = await User.findByIdAndUpdate(userId, userdata, {new:true});
        return updatedUser
     }

     deleteUserById = async(userId:string):Promise<boolean>=>{
            const deleteUser:any =  await User.findByIdAndDelete(userId)
            return deleteUser;
     }
}

export default new UserServices()