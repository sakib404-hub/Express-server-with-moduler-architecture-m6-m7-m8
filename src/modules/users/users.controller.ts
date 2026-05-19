import { response, type Request, type Response } from "express";
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

        const result = await usersService.getAllUserFromDatabase();
        sendResponse(res, 200, true, 'Users Information fetched successfully', result.rows);

    }catch(err : any){
        sendResponse(res, 500, false, err.message);
    }
}

const getSingleUser = async(req : Request, res : Response)=>{
    try{

        const {id} = req.params;

        const result = await usersService.getSingleUserFromDatabase(id as string);
        
        if(result.rowCount === 0 || result.rows.length === 0){
            return sendResponse(res, 404, false, `User with id -> ${id} is not found`);
        }

        sendResponse(res, 200, true, 'Users Infomation fetched successfully', result.rows[0]);

    }catch(err : any){
        sendResponse(res, 500, false, err.messagge);
    }
}


const usersController = {
    createUser,
    getAllUser,
    getSingleUser
}


export default usersController;