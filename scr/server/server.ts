
import express from "express"
import path from "path"
import * as bodyParser from 'body-parser'
import https from 'https'
import http from 'http'
import OracleDBBonus from '../common/db/oracledb';
import cors from 'cors';
const { configInitial, url_origin_listener } = require('../common/untils/microserviceConfig');

export default class Server {

    public app: express.Application;
    public port: number;
    private allowedOrigins = [url_origin_listener];
    private options: cors.CorsOptions = {
        origin: this.allowedOrigins
      };

    constructor( port: number ){
        this.port = port;
        this.app = express();
        this.app.use(cors(this.options));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    static init ( port:number ){
        return new Server( port );
    }

    private publicFolder(){
        const publicPath = path.resolve( __dirname, '../public' );
        this.app.use( express.static( publicPath ) );
    }

    start( callback: Function ){
        configInitial();
        this.publicFolder();

        const options ={
            key: process.env.SSLKEY,
            cert: process.env.SSLCERT
        };





        const protocol = (options.key) ? https : http;

        protocol.createServer((options.key) ? options : {}, this.app)
        .listen(this.port, callback())

        process.on('SIGINT', function() {
            OracleDBBonus.instance.closeConnection();
            process.exit();
        });
    }

}