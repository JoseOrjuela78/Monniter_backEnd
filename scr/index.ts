import Server from "./server/server"
//import router from './router/route'
import * as dotenv from "dotenv"
import OracleDBBonus from "./common/db/oracledb";


// Env configuration
dotenv.config();

const PORT: any = process.env.PORT_CUPON || 3000;
const server = Server.init( parseInt(PORT) );

// Instantiate DB


OracleDBBonus.instance

 
// express uses
//server.app.use( router );

server.start( () => {
    console.log(`Disparador corriendo en el puerto ${ PORT }`);
});
