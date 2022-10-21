"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_controllers_1 = require("./usuarios.controllers");
const router = (0, express_1.Router)();
router.get('/', usuarios_controllers_1.getUsuarios);
router.get('/:id', usuarios_controllers_1.getUsuario);
router.post('/', usuarios_controllers_1.createUsuarioC);
router.put('/:id', usuarios_controllers_1.updateUsuarioC);
router.delete('/:id', usuarios_controllers_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.routes.js.map