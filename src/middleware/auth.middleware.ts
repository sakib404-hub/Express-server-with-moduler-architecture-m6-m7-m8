import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/sendResponse";
import jwt, { type JwtHeader, type JwtPayload } from 'jsonwebtoken'
import config from "../config/config";
import { pool } from "../database";


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // console.log(req.headers);
        // console.log(req.headers.authorization)
        // console.log('this is the protected route');

        const accessToken = req.headers.authorization;



        if(!accessToken){
            return sendResponse(res, 401, false, 'Unauthorized access');
        }

        const decoded = jwt.verify(accessToken as string, config.jwtSecret as string) as JwtPayload;


        const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email]);

        const user = userExist.rows[0];

        if(!user){
            return sendResponse(res, 404, false, 'User not found!');
        }else if(user.is_active){
            return sendResponse(res, 404, false, 'Forbidden Access!');
        }

        next();
    }
}

export default auth;