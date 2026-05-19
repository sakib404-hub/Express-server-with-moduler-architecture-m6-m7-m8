import { pool } from "../../database";
import type { IUser } from "./users.interface";


const createUserIntoDatabase = async(payLoad : IUser)=>{
    const {name , email, password,  is_active = false, age } = payLoad;

    const result = await pool.query(`
        INSERT INTO users(name, email, password, is_active, age) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, password, is_active, age]);
    
    delete result.rows[0].password; //deleting the password in the returing result

    return result;
}

const getAllUserFromDatabase = async() =>{
    const result = await pool.query(`SELECT * FROM users`);
    return result;
}

const getSingleUserFromDatabase = async(id : string)=>{
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
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