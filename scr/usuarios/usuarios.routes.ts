import { Router } from "express";
import { getUsuarios, getUsuario, createUsuarioC, updateUsuarioC, deleteUsuario } from './usuarios.controllers';
const router = Router();

router.get('/', getUsuarios );
router.get('/:id', getUsuario );
router.post('/', createUsuarioC );
router.put('/:id', updateUsuarioC );
router.delete('/:id', deleteUsuario );

export default router;