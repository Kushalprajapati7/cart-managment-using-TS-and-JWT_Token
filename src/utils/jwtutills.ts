import jwt from "jsonwebtoken";

import * as env from 'dotenv'
env.config();

export class JwtUtils {
    static key:string = 'KP'

    static generateToken(userId:string):string{
        return jwt.sign({userId}, this.key, {expiresIn: '1h'});
    }
    
    static verifyToken(token:string):string|object{
        try {
            return jwt.verify(token, this.key)
        } catch (error:any) {
            throw new Error('Invalid token');
        }
    }
}