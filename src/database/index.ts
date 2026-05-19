import {Pool} from 'pg'
import config from '../config/config'

export const pool = new Pool({
    connectionString : config.connectionString
})

export const initDB = async() =>{
    try{

        await pool.query(`
                CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                is_active BOOLEAN DEFAULT true,
                age INT,

                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
                )
            `)
        console.log('Database connected successfully');
    }catch(err : any){
        console.log(err.message)
    }
}