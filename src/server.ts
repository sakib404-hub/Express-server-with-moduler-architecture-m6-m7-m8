import app from "./app"
import config from "./config/config"
import { initDB } from "./database"


const main = () =>{
    initDB();
    app.listen(config.port, ()=>{
    console.log(`This app is listening from port number  : ${config.port}`);
    })
}

main();