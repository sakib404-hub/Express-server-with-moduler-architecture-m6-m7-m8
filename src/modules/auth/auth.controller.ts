import type { Request, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import authService from "./auth.service";


const loginUser = async(req : Request, res : Response)=>{
    try{

        const result = await authService.loginUserIntoDatabase(req.body);

        const {refreshToken} = result;

        res.cookie('refreshToken', refreshToken, {
            secure : false,
            httpOnly : true,
            sameSite : 'lax',
        })

        sendResponse(res ,200, true, 'User information retrived successfully', result)

    }catch(err : any){
        sendResponse(res, 500, false, err.message)
    }
}

const refreshToken = async(req : Request, res : Response)=>{
     try{
        // console.log(req.cookies);

        const result = await authService.generateToken(req.cookies.refreshToken);

        sendResponse(res ,200, true, 'Access Token Generated!', result);

    }catch(err : any){
        sendResponse(res, 500, false, err.message)
    }
}

const authController = {
    loginUser,
    refreshToken
}

export default authController;