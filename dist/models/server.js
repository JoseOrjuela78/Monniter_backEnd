"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usuarios_routes_1 = __importDefault(require("../scr/usuarios/usuarios.routes"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/v1/usuarios'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //middlewares
        this.middlewares();
        // rutas
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        // LECTURA BODY
        this.app.use(express_1.default.json());
        // CARPETA PUBLIC
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto : ' + this.port);
        });
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuarios_routes_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map