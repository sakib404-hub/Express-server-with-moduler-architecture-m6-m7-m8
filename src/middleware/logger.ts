import type { NextFunction, Request, Response } from 'express';
import fs from 'fs'

const logger = (req : Request, res : Response, next : NextFunction)=>{
    const time = new Date().toISOString();

    const log = `[${time}] ${req.method} ${req.url}\n`

    fs.appendFile('logger.txt', log, 'utf8', (err)=>{
        if(err){
            console.log('Failed to write log : ', err.message);
        }
    } )

    next()
}
export default logger;