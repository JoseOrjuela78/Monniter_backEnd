"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
class OracleDB {
    constructor() {
        this.conected = false;
        console.log("Class initialized");
        this.cnnAttrs = {
            connectString: process.env.DB_HOST_BN || "LOCALHOST",
            user: process.env.DB_USER_BN || "root",
            password: process.env.DB_PASSWORD_BN || "",
            events: false,
            externalAuth: false,
            poolAlias: 'corredor',
            poolTimeout: 30,
            poolMax: 10,
            poolMin: 1,
            stmtCacheSize: 30
        };
        this.createPool();
    }
    static execQuery(query, parameters, autoCommit = false, closeConnection = true) {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield this.instance.pool.getConnection();
            try {
                let result = yield this.connection.execute(query, parameters, {
                    autoCommit: autoCommit,
                    outFormat: oracledb_1.default.OUT_FORMAT_OBJECT,
                });
                if (closeConnection) {
                    //console.log("cerrando conexión execQuery");
                    this.connection.close();
                }
                return result;
            }
            catch (err) {
                console.log(err);
                this.connection.close();
                throw err;
            }
        });
    }
    static fetchFromCursor(resultSet, closeConnection = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield resultSet.getRows(0);
                //console.log(result);
                resultSet.close();
                // Cerramos la conexion con el pool de conexiones
                if (closeConnection) {
                    //console.log("cerrando conexión fetch");
                    this.connection.close();
                }
                return result;
            }
            catch (err) {
                this.connection.close();
                throw err;
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.conected == true) {
                    yield this.pool.close();
                    this.conected = false;
                    console.log("Disconnected");
                }
            }
            catch (err) {
                throw err;
            }
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    createPool() {
        return __awaiter(this, void 0, void 0, function* () {
            this.pool = yield oracledb_1.default.createPool(this.cnnAttrs);
            this.conected = true;
            console.log("Pool created");
        });
    }
}
exports.default = OracleDB;
//# sourceMappingURL=oracledb.js.map