import { json, Request , Response} from 'express';
import { createUsuario, updateUsuario } from './usuarios.operations';

export const getUsuarios = (req:Request, res:Response) =>{
    res.json({
        msg: 'getUsuarios'
    });
};

export const getUsuario = (req:Request, res:Response) =>{
    const { id } = req.params;

    res.json({
        msg: 'getUsuario',
        id 
    });
};

export const createUsuarioC = (req:Request, res:Response) =>{
    const { body } = req;

   console.log("create Usuario")
   const result = createUsuario(body);

  result.then(d =>{

   if(d.STATUS_CODE === 200){
    console.log(d)
    return res.json({
        ok: true,
        STATUS_DESC: d.STATUS_DESC,
        STATUS_CODE: d.STATUS_CODE
    });

   } else {
    console.log(d)
    return res.json({
        ok: false,
        STATUS_DESC: d.STATUS_DESC,
        STATUS_CODE: d.STATUS_CODE
    });

   }

  }).catch((err)=>{

    return res.json({
        ok: false,
        msg: 'error en el sistema',
        err
    
    })

  });

    
};

export const updateUsuarioC = (req:Request, res:Response) =>{
    const { id } = req.params;
    const { body } = req;


    console.log("update Usuario")
    const result = updateUsuario(body, id);
 
   result.then(d =>{
 
    if(d.STATUS_CODE === 200){
     console.log(d)
     return res.json({
         ok: true,
         STATUS_DESC: d.STATUS_DESC,
         STATUS_CODE: d.STATUS_CODE
     });
 
    } else {
     console.log(d)
     return res.json({
         ok: false,
         STATUS_DESC: d.STATUS_DESC,
         STATUS_CODE: d.STATUS_CODE
     });
 
    }
 
   }).catch((err)=>{
 
     return res.json({
         ok: false,
         msg: 'error en el sistema',
         err
     
     })
 
   });
     
};

export const deleteUsuario = (req:Request, res:Response) =>{
    const { id } = req.params;

    res.json({
        msg: 'deleteUsuario',
        id 
    });
};