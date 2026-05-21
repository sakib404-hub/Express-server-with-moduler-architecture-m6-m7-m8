import type { Request, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import authService from "./auth.service";


const loginUser = async(req : Request, res : Response)=>{
    try{

        const result = await authService.loginUserIntoDatabase(req.body);

        sendResponse(res ,200, true, 'User information retrived successfully', result)

    }catch(err : any){
        sendResponse(res, 500, false, err.message)
    }
}

const authController = {
    loginUser
}

export default authController;