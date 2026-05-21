import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "../utility/sendResponse";


const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        // console.log(req.headers);
        // console.log(req.headers.authorization)
        // console.log('this is the protected route');

        const accessToken = req.headers.authorization;

        if(!accessToken){
            return sendResponse(res, 401, false, 'Unauthorized access');
        }

        next();
    }
}

export default auth;