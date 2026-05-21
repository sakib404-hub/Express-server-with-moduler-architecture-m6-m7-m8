import { pool } from "../../database";
import type { Profile } from "./profile.interface";


const createProfileIntoDatabse = async(payLoad : Profile)=>{
    const {user_id, bio, address, phone, gender} = payLoad;
    //? check if the user exists

    const user = await pool.query(`SELECT * FROM users WHERE id=$1`, [user_id]);
    
    if(user.rowCount === 0){
        throw new Error("User does not exists");
    }


    const result = await pool.query(`
        INSERT INTO profiles(user_id,bio, address, phone, gender) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [user_id,bio, address, phone, gender]);

    return result;

}

const getAllProfileFromDatabase = async() =>{
    const result = await pool.query(`SELECT * FROM profiles`);
    return result;
}

const getSingleProfile = async(id : string)=>{
    const result = await pool.query(`SELECT * FROM profiles WHERE id=$1`, [id]);
    return result;
}

const deleteProfileFromDatabase = async(id : string)=>{
    const result = await pool.query(`DELETE FROM profiles WHERE id=$1 RETURNING *`, [id]);
    return result;
}

const profileServces = {
    createProfileIntoDatabse,
    getAllProfileFromDatabase,
    getSingleProfile,
    deleteProfileFromDatabase
}

export default profileServces;