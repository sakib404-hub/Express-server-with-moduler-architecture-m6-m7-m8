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

const profileServces = {
    createProfileIntoDatabse
}

export default profileServces;