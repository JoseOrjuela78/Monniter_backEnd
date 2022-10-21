"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.updateUsuarioC = exports.createUsuarioC = exports.getUsuario = exports.getUsuarios = void 0;
const usuarios_operations_1 = require("./usuarios.operations");
const getUsuarios = (req, res) => {
    res.json({
        msg: 'getUsuarios'
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'getUsuario',
        id
    });
};
exports.getUsuario = getUsuario;
const createUsuarioC = (req, res) => {
    const { body } = req;
    console.log("create Usuario");
    const result = (0, usuarios_operations_1.createUsuario)(body);
    result.then(d => {
        if (d.STATUS_CODE === 200) {
            console.log(d);
            return res.json({
                ok: true,
                STATUS_DESC: d.STATUS_DESC,
                STATUS_CODE: d.STATUS_CODE
            });
        }
        else {
            console.log(d);
            return res.json({
                ok: false,
                STATUS_DESC: d.STATUS_DESC,
                STATUS_CODE: d.STATUS_CODE
            });
        }
    }).catch((err) => {
        return res.json({
            ok: false,
            msg: 'error en el sistema',
            err
        });
    });
};
exports.createUsuarioC = createUsuarioC;
const updateUsuarioC = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("update Usuario");
    const result = (0, usuarios_operations_1.updateUsuario)(body, id);
    result.then(d => {
        if (d.STATUS_CODE === 200) {
            console.log(d);
            return res.json({
                ok: true,
                STATUS_DESC: d.STATUS_DESC,
                STATUS_CODE: d.STATUS_CODE
            });
        }
        else {
            console.log(d);
            return res.json({
                ok: false,
                STATUS_DESC: d.STATUS_DESC,
                STATUS_CODE: d.STATUS_CODE
            });
        }
    }).catch((err) => {
        return res.json({
            ok: false,
            msg: 'error en el sistema',
            err
        });
    });
};
exports.updateUsuarioC = updateUsuarioC;
const deleteUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'deleteUsuario',
        id
    });
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controllers.js.map