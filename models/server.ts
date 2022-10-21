
import express, { Application }  from 'express';
import cors from 'cors';
import rutasUsuario from '../scr/usuarios/usuarios.routes';

class Server {
    private app: Application;
    private port:string;
    private apiPaths = {
        usuarios: '/api/v1/usuarios'
    }
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
        //middlewares
        this.middlewares();
        // rutas
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());
        // LECTURA BODY
        this.app.use(express.json());
        // CARPETA PUBLIC
        this.app.use(express.static('public'));
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto : ' + this.port);
        });
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, rutasUsuario);
    }
}

export default Server;