import config from "../../config/config";
import { pool } from "../../database";
import { sendResponse } from "../../utility/sendResponse";
import type { AuthInfo } from "./auth.interface";
import bcrypt from 'bcrypt'
import jwt, { type JwtPayload } from 'jsonwebtoken'



const loginUserIntoDatabase = async (payLoad: AuthInfo) => {

    const { email, password } = payLoad;
    //? check if the user exist with the email provided

    const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`, [email]);

    //? checking if the user found or not
    if (userExist.rowCount === 0) {
        throw new Error('User does not exists');
    }

    const matchedPassword = await bcrypt.compare(password, userExist.rows[0].password);

    //? checking if the password is matched
    if (!matchedPassword) {
        throw new Error('Invalid Credential');
    }

    //? token generation
    const jwtPayload = {
        id: userExist.rows[0].id,
        name: userExist.rows[0].name,
        email: userExist.rows[0].email,
        is_active: userExist.rows[0].is_active,
        role: userExist.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, { expiresIn: '1d' });
    const refreshToken = jwt.sign(jwtPayload, config.refresh_token_secret as string, { expiresIn: '1d' });

    return { accessToken, refreshToken };
}

const generateToken = async (token: string) => {
    if (!token) {
        throw new Error('UnAuthorized Access!');
    }

    const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;

    const userExist = await pool.query(`SELECT * FROM users WHERE email=$1`, [decoded.email]);

    const user = userExist.rows[0];

    if (!user) {
        throw new Error('User not found!');
    } else if (user.is_active) {
        throw new Error('Forbidden Access!');
    }

    //? token generation
    const jwtPayload = {
        id: userExist.rows[0].id,
        name: userExist.rows[0].name,
        email: userExist.rows[0].email,
        is_active: userExist.rows[0].is_active,
        role: userExist.rows[0].role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwtSecret as string, { expiresIn: '1d' });
    const refreshToken = jwt.sign(jwtPayload, config.refresh_token_secret as string, { expiresIn: '1d' });

    return { accessToken, refreshToken };
}

const authService = {
    loginUserIntoDatabase,
    generateToken
}

export default authService;