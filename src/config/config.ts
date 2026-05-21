import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
    path : path.join(process.cwd(), '.env')
})

const config = {
    port  : process.env.PORTNUMBER,
    connectionString : process.env.CONNECTION_STRING ,
    jwtSecret : process.env.jwtSecret
}

export default config;