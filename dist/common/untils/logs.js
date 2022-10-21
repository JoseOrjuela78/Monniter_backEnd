"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const moment = require('moment');
let finishLog = (status, response, req) => {
    const dir = path_1.default.resolve(__dirname, `${process.env.LOGS_PATH_CUPON}/access-api-optimove-${moment().format('YYYY-MM-DD')}.log`);
    var log = '';
    log += req.params.log;
    log += moment().format('YYYY-MM-DD HH:mm:ss') + '|';
    log += status + '|';
    log += response + '\n';
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.writeFileSync(dir, '', { flag: 'wx' });
    }
    fs_1.default.appendFileSync(dir, log);
};
let errorLog = (status, response, req, err) => {
    const dir = path_1.default.resolve(__dirname, `${process.env.LOGS_PATH_CUPON}/error-api-optimove-${moment().format('YYYY-MM-DD')}.log`);
    var log = '';
    log += req.params.log;
    log += moment().format('YYYY-MM-DD HH:mm:ss') + '|';
    log += status + '|';
    log += response + '|';
    log += err.toString() + '\n';
    console.log(err);
    console.log(log);
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.writeFileSync(dir, '', { flag: 'wx' });
    }
    fs_1.default.appendFileSync(dir, log);
};
module.exports = {
    finishLog,
    errorLog
};
//# sourceMappingURL=logs.js.map