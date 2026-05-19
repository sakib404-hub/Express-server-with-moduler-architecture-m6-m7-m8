import type { Application, Request, Response } from "express";
import express from 'express'


const app : Application = express();


app.get('/', async(req : Request, res : Response)=>{
    res.status(200).json({
        success : true,
        message : 'This is the root route of this server'
    })
})

export default app;