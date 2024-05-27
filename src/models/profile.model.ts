import mongoose,{Document,Model,Schema} from "mongoose";
import { IProfile } from "../interfaces/profilrInterface";

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