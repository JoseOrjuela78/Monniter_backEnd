"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bodyParser = __importStar(require("body-parser"));
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const oracledb_1 = __importDefault(require("../common/db/oracledb"));
const cors_1 = __importDefault(require("cors"));
const { configInitial, url_origin_listener } = require('../common/untils/microserviceConfig');
class Server {
    constructor(port) {
        this.allowedOrigins = [url_origin_listener];
        this.options = {
            origin: this.allowedOrigins
        };
        this.port = port;
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)(this.options));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    static init(port) {
        return new Server(port);
    }
    publicFolder() {
        const publicPath = path_1.default.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
    start(callback) {
        configInitial();
        this.publicFolder();
        const options = {
            key: process.env.SSLKEY,
            cert: process.env.SSLCERT
        };
        const protocol = (options.key) ? https_1.default : http_1.default;
        protocol.createServer((options.key) ? options : {}, this.app)
            .listen(this.port, callback());
        process.on('SIGINT', function () {
            oracledb_1.default.instance.closeConnection();
            process.exit();
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map