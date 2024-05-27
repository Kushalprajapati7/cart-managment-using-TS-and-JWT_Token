import User from "../models/user.model";
import { IUser } from "../interfaces/userInterface";
import bcrypt from "bcryptjs";
import { JwtUtils } from "../utils/jwtutills";

class AuthService {
    signUp = async (userdata: IUser): Promise<IUser> => {
        const hashPass = await bcrypt.hash(userdata.password, 10);
        userdata.password = hashPass;

        const newUser = new User(userdata);
        return await newUser.save();
    }

    login = async (username: string, password: string): Promise<string> => {
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error(`User with Username ${username} not found`);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error(`Invalid password`)
        }
        const token: string = JwtUtils.generateToken(user._id.toString())
        return token;
    }
}

export default new AuthService()