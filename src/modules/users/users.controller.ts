import type { Request, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import usersService from "./users.service";

const createUser = async(req : Request, res : Response) =>{
    try{

        const result = await usersService.createUserIntoDatabase(req.body);

        sendResponse(res, 200, true, 'User created successfully', result.rows[0]);

    }catch(err : any){
        sendResponse(res, 500, false, err.message);
    }
}

const getAllUser = async(req : Request, res : Response)=>{
    try{
        const userData = {
            name : 'Md. Sakib Hossen', 
            age : 26
        }

        sendResponse(res, 200, true, 'Users Information fetched successfully', userData);

    }catch(err : any){
        sendResponse(res, 500, false, err.message);
    }
}


const usersController = {
    createUser,
    getAllUser
}


export default usersController;