import type { Application, Request, Response } from "express";
import express from 'express'
import { usersRoute } from "./modules/users/users.route";
import { productRoute } from "./modules/product/product.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import CookieParser from "cookie-parser";
import cors from 'cors'
import globalErrorHandler from "./utility/globalErroHanler";

const app: Application = express();

//middleware for the json information --> middleware works as a middleman between the two 
app.use(CookieParser())
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))


// const corsOptions = {
//   origin: 'http://localhost:5000',
// }

app.use(cors({
  origin: 'http://localhost:5000',
}));

app.use(logger)



app.use('/users', usersRoute);
app.use('/products', productRoute);
app.use('/profiles', profileRouter);
app.use('/api/auth', authRouter);




app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'This is the root route of this server'
    })
})

app.use(globalErrorHandler)

export default app;