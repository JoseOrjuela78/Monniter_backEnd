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
const oracledb_1 = __importDefault(require("../db/oracledb"));
const oracledb_2 = __importDefault(require("oracledb"));
let configMicroservices = {
    url_optimove: '',
    url_event_listener: ''
};
const configInitial = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield getParameters().then((rows) => {
        function getParameter(value) {
            try {
                return (rows.filter(function (item) {
                    return (item.CODIGO == value);
                }))[0].VALOR;
            }
            catch (e) {
                return null;
            }
        }
        configMicroservices.url_optimove = getParameter(277);
        configMicroservices.url_event_listener = getParameter(287);
    });
});
const getParameters = () => __awaiter(void 0, void 0, void 0, function* () {
    const sql = 'BEGIN GET_PARAMETERS(:result); END;';
    const parameters = {
        result: {
            dir: oracledb_2.default.BIND_OUT,
            type: oracledb_2.default.CURSOR
        }
    };
    try {
        const result = yield oracledb_1.default.execQuery(sql, parameters, true, false);
        const outBinds = result.outBinds;
        const cursor = outBinds.result;
        const rows = yield oracledb_1.default.fetchFromCursor(cursor);
        return rows;
    }
    catch (error) {
        return error;
    }
});
module.exports = {
    configInitial,
    configMicroservices
};
//# sourceMappingURL=microserviceConfig.js.map