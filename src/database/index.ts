import { Pool } from 'pg'
import config from '../config/config'

export const pool = new Pool({
    connectionString: config.connectionString
})

export const initDB = async () => {
    try {

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

        await pool.query(`
            CREATE TABLE IF NOT EXISTS products(
            id SERIAL PRIMARY KEY,

            name VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            price NUMERIC(10,2) NOT NULL,
            in_stock BOOLEAN DEFAULT true,
            category_id INT NOT NULL,
            brand VARCHAR(255),

            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS profiles(
            id SERIAL PRIMARY KEY,

            user_id INT UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

            bio TEXT,
            address TEXT,

            phone VARCHAR(255),
            gender VARCHAR(255),

            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
            )
            `)

        console.log('Database connected successfully');
    } catch (err: any) {
        console.log(err.message)
    }
}