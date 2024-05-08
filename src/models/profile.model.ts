import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "./user.model";

export interface IProfile extends Document{
    UserId : IUser['_id'],
    name: string,
    dob: Date,
    email: string,
    gender: string
}

const profileSchema: Schema = new Schema({

    userId: { type: Schema.Types.ObjectId , ref: 'User', required: true },
    name: { type:String, required:true},
    dob: { type: Date, required: true},
    email: {type:String, required: true},
    gender:{type:String, required:true}
},{
    timestamps:true
})

const Profile: Model<IProfile> = mongoose.model<IProfile>('Profile', profileSchema);

export default Profile;