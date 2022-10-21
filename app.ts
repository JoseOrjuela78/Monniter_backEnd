import dotenv from 'dotenv';
import Server from './models/server';
import OracleDB from './db/oracledb';
dotenv.config();

//Instancia base de datos
OracleDB.instance

const server = new Server();
server.listen();