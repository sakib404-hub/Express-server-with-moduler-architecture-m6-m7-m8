import type { Request, Response } from "express";
import { sendResponse } from "../../utility/sendResponse";
import profileServces from "./profile.service";


const createProfile = async(req : Request, res : Response) =>{
    try{

        const body = req.body;

        const result = await profileServces.createProfileIntoDatabse(body);

        if(result.rowCount === 0){
            return sendResponse(res, 400, false, 'Failed to create profile!')
        }

        return sendResponse(res, 201, true, 'Users profiles created Successfully', result.rows[0]);

    }catch(err : any){
        sendResponse(res, 500, false, err.message);
    }
}

const getAllProfile = async(req : Request, res : Response)=>{
    try{

        const result = await profileServces.getAllProfileFromDatabase();

        if(result.rowCount === 0){
           return sendResponse(res, 400, false, 'No profile exists in the database');
        }
        return sendResponse(res, 200, true, 'Profiles fetched successfully', result.rows);

    }catch(err : any){
        return sendResponse(res, 500, false, err.message)
    }
}

const profileController = {
    createProfile,
    getAllProfile
}

export default profileController;