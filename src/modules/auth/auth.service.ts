import config from "../../config/config";
import { pool } from "../../database";
import type { AuthInfo } from "./auth.interface";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const loginUserIntoDatabase = async(payLoad : AuthInfo)=>{

    const {email, password} = payLoad;
    //? check if the user exist with the email provided

    const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);

    //? checking if the user found or not
    if(userExist.rowCount === 0){
        throw new Error('User does not exists');
    }

    const matchedPassword = await bcrypt.compare(password ,userExist.rows[0].password);

    //? checking if the password is matched
    if(!matchedPassword){
        throw new Error('Invalid Credential');
    }

    //? token generation
    const jwtPayload = {
        id : userExist.rows[0].id,
        name : userExist.rows[0].name,
        email : userExist.rows[0].email,
        is_active : userExist.rows[0].is_active,
        role : userExist.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, {expiresIn : '1d'})
    return accessToken;
}

const authService = {
    loginUserIntoDatabase
}

export default authService;