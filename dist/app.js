"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./models/server"));
const oracledb_1 = __importDefault(require("./db/oracledb"));
dotenv_1.default.config();
//Instancia base de datos
oracledb_1.default.instance;
const server = new server_1.default();
server.listen();
//# sourceMappingURL=app.js.map