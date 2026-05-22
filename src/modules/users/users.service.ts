import { pool } from "../../database";
import type { IUser } from "./users.interface";
import bcrypt from 'bcrypt'


const createUserIntoDatabase = async(payLoad : IUser)=>{
    const {name , email, password,  is_active = false, age, role } = payLoad;
                                 //entered password , salt number
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(`
        INSERT INTO users(name, email, password, is_active, age, role) VALUES($1, $2, $3, $4, $5, COALESCE($6, 'user')) RETURNING *
        `, [name, email, hashedPassword, is_active, age, role]);
    
    delete result.rows[0].password;
    return result;
}

const getAllUserFromDatabase = async() =>{
    const result = await pool.query(`SELECT  id, name, email, is_active, age, created_at, updated_at FROM users`);
    return result;
}

const getSingleUserFromDatabase = async(id : string)=>{
    const result = await pool.query(`SELECT  id, name, email, is_active, age, created_at, updated_at FROM users WHERE id=$1`, [id]);
    return result;
}

const updateUserInformationIntoDatabase = async( id : string, payLoad : IUser)=>{
    const {name, email, password, is_active, age} = payLoad;

    const result = await pool.query(`
        UPDATE users 
        SET
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        password = COALESCE($3, password),
        is_active = COALESCE($4, is_active),
        age = COALESCE($5, age),
        updated_at = NOW() WHERE id = $6 RETURNING *
        `, [name, email, password, is_active, age, id]);

    return result;
}

const deleteUserInformationFromDatabase = async(id : string)=>{
    const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [id]);
    return result;
}

const usersService = {
    createUserIntoDatabase,
    getAllUserFromDatabase,
    getSingleUserFromDatabase,
    updateUserInformationIntoDatabase,
    deleteUserInformationFromDatabase
}

export default usersService;