import type { Application, Request, Response } from "express";
import express from 'express'
import { usersRoute } from "./modules/users/users.route";

const app : Application = express();

//middleware for the json information
app.use(express.json())


app.use('/users', usersRoute);


app.get('/', async(req : Request, res : Response)=>{
    res.status(200).json({
        success : true,
        message : 'This is the root route of this server'
    })
})

export default app;