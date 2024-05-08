import express, { Request, Response } from "express";
import * as dotenv from 'dotenv';
import connectDB from "./config/db";
import authRoute from './routes/authRoutes'
import userRoute from './routes/userRoutes'
import profileRoute from './routes/profileRoutes'
import verifyToken from "./middlewares/authMiddleware";
import productRoute from './routes/productRoute'
import cartRoute from './routes/cartRoutes'

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', verifyToken , profileRoute)
app.use('/', verifyToken , productRoute)
app.use('/', verifyToken , cartRoute)

app.get('/', (req: Request, res: Response) => {
    res.send("Hey ");
})

connectDB();

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});
