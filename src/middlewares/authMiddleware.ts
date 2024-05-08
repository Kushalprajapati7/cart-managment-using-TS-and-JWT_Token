import { Request, Response, NextFunction } from "express";
import CustomRequest from "../types/customeRequest"; 
import jwt from 'jsonwebtoken'

async function verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        // console.log("Inide middlwarw");
        
        const decoded = jwt.verify(token, 'KushalP') as { userId: string };
        // console.log("d",decoded.userId);
        req.userId = decoded.userId;
        // console.log(req.userId);
        next();
    } catch (error:any) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export default verifyToken;
