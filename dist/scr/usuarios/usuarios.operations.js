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
exports.updateUsuario = exports.createUsuario = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const oracledb_2 = __importDefault(require("../../db/oracledb"));
const createUsuario = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { USERNAME, ID_PERSONA, ROL, PASSWORD } = body;
    const sql = 'BEGIN USUARIOS_PACK.ALTA_USUARIO(:P_USERNAME,:P_ID_PERSONA,:P_ROL,:P_PASSWORD,:STATUS_CODE,:STATUS_DESC);END;';
    const parameters = {
        P_USERNAME: USERNAME,
        P_ID_PERSONA: ID_PERSONA,
        P_ROL: ROL,
        P_PASSWORD: PASSWORD,
        STATUS_CODE: {
            type: oracledb_1.default.NUMBER,
            dir: oracledb_1.default.BIND_OUT
        },
        STATUS_DESC: {
            type: oracledb_1.default.STRING,
            dir: oracledb_1.default.BIND_OUT
        }
    };
    // base de datos
    try {
        let result = yield oracledb_2.default.execQuery(sql, parameters, true);
        let outBinds = result.outBinds;
        return outBinds;
    }
    catch (error) {
        console.log({ error });
        return error;
    }
});
exports.createUsuario = createUsuario;
const updateUsuario = (body, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const { ROL, ESTADO } = body;
    const sql = 'BEGIN USUARIOS_PACK.UPDATE_USUARIO(:P_USERNAME,:P_ROL,:P_ESTADO,:STATUS_CODE,:STATUS_DESC);END;';
    const parameters = {
        P_USERNAME: userName,
        P_ROL: ROL,
        P_ESTADO: ESTADO,
        STATUS_CODE: {
            type: oracledb_1.default.NUMBER,
            dir: oracledb_1.default.BIND_OUT
        },
        STATUS_DESC: {
            type: oracledb_1.default.STRING,
            dir: oracledb_1.default.BIND_OUT
        }
    };
    // base de datos
    try {
        let result = yield oracledb_2.default.execQuery(sql, parameters, true);
        let outBinds = result.outBinds;
        return outBinds;
    }
    catch (error) {
        console.log({ error });
        return error;
    }
});
exports.updateUsuario = updateUsuario;
//# sourceMappingURL=usuarios.operations.js.map