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


const usersService = {
    createUserIntoDatabase,
    getAllUserFromDatabase,
    getSingleUserFromDatabase
}

export default usersService;