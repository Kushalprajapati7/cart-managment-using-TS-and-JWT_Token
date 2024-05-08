import mongoose,{Document,Schema} from "mongoose";


export interface IUser extends Document{
    username:string,
    password: string
}

const userSchema :Schema = new Schema({
    username :{type:String , required: [true,"UserName is Required"]},
    password : {type:String ,  required: [true,"Password can not be empty"]}
},
{
    timestamps:true,
})
const User = mongoose.model<IUser>('User',userSchema);

export default User;