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
exports.notifyNewEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const hbs = require('nodemailer-express-handlebars');
function notifyNewEmail(incident) {
    return __awaiter(this, void 0, void 0, function* () {
        const rutaViews = '../../../views/';
        const hbsConfig = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path_1.default.join(__dirname, rutaViews),
                layoutsDir: path_1.default.join(__dirname, rutaViews),
                defaultLayout: ''
            },
            viewPath: path_1.default.join(__dirname, rutaViews),
            extName: '.hbs'
        };
        // Prueba gmail
        const transporter = nodemailer_1.default.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD
            },
            logger: true
        });
        transporter.use('compile', hbs(hbsConfig));
        const ccValues = [];
        if (incident.assignedTo !== incident.createdBy) {
            ccValues.push(incident.createdBy);
            ccValues.push(incident.assignedTo);
        }
        else {
            ccValues.push(incident.createdBy);
        }
        const email = {
            from: 'Soporte monniter',
            to: process.env.USER,
            cc: ccValues,
            subject: 'Notificaciónes MONNITER ' + incident.company,
            template: 'newIncident',
            context: { incident }
        };
        return yield transporter.sendMail(email).then(result => {
            return 200;
        }).catch(error => {
            return 400;
        });
    });
}
exports.notifyNewEmail = notifyNewEmail;
;
//# sourceMappingURL=email.js.map