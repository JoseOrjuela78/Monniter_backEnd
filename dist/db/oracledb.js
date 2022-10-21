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
        this.conected = true;
        console.log("Class OracleDB initiallized");
        this.cnnAttrs = {
            user: "MONNITER",
            password: "123456",
            connectString: "localhost",
            poolAlias: "moniterUser"
        };
        this.createPool();
    }
    static execQuery(query, parameters, autoCommit = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.instance.pool.getConnection();
            try {
                let result = yield connection.execute(query, parameters, {
                    autoCommit
                });
                connection.close();
                return result;
            }
            catch (error) {
                connection.close();
                throw error;
            }
        });
    }
    closeConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.conected == true) {
                    yield this.pool.close();
                    this.conected = false;
                    console.log('Desconectado');
                }
            }
            catch (error) {
                throw error;
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