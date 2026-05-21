import type { Application, Request, Response } from "express";
import express from 'express'
import { usersRoute } from "./modules/users/users.route";
import { productRoute } from "./modules/product/product.route";
import { profileRouter } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import fs from 'fs'

const app: Application = express();

//middleware for the json information --> middleware works as a middleman between the two 
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {

    const time = new Date().toISOString();
    const log = `[${time}] ${req.method} ${req.url}\n`;

    fs.appendFile('logger.txt', log, 'utf8', (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });

    next();
});

const logger = (req : Request)=>{
    const time = new Date().toISOString();

    const log = `[${time}] [${req.method}] [${req.url}]`

    fs.appendFile('logger.txt', log, 'utf8', (err)=>{
        if(err){
            console.log('Failed to write log : ', err.message);
        }
    } )
}


app.use('/users', usersRoute);
app.use('/products', productRoute);
app.use('/profiles', profileRouter);
app.use('/api/auth', authRouter)



app.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'This is the root route of this server'
    })
})

export default app;