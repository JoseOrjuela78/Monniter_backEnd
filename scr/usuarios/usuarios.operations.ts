import oracledb from 'oracledb';
import OracleDB from '../../db/oracledb';


export const createUsuario = async (body: any) =>{

    const {USERNAME, ID_PERSONA, ROL, PASSWORD} = body;

    const sql = 'BEGIN USUARIOS_PACK.ALTA_USUARIO(:P_USERNAME,:P_ID_PERSONA,:P_ROL,:P_PASSWORD,:STATUS_CODE,:STATUS_DESC);END;'
    const parameters: any ={
    P_USERNAME: USERNAME,
    P_ID_PERSONA: ID_PERSONA,
    P_ROL: ROL,
    P_PASSWORD: PASSWORD,
    STATUS_CODE:{
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
    },
    STATUS_DESC:{
        type: oracledb.STRING,
        dir: oracledb.BIND_OUT
    }

    }

    // base de datos

    try {

        let result = await OracleDB.execQuery(sql, parameters, true);
        let outBinds = result.outBinds;
        return outBinds;
        
    } catch (error) {
        console.log({error});
        return error;
        
    }

    
}

export const updateUsuario = async (body: any, userName: string) =>{

    const {ROL, ESTADO} = body;

    const sql = 'BEGIN USUARIOS_PACK.UPDATE_USUARIO(:P_USERNAME,:P_ROL,:P_ESTADO,:STATUS_CODE,:STATUS_DESC);END;'
    const parameters: any ={
    P_USERNAME: userName,
    P_ROL: ROL,
    P_ESTADO: ESTADO,
    STATUS_CODE:{
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
    },
    STATUS_DESC:{
        type: oracledb.STRING,
        dir: oracledb.BIND_OUT
    }

    }

    // base de datos

    try {

        let result = await OracleDB.execQuery(sql, parameters, true);
        let outBinds = result.outBinds;
        return outBinds;
        
    } catch (error) {
        console.log({error});
        return error;
        
    }

    
}

export const getUsuario = async (userName: string) =>{

    const sql = 'BEGIN USUARIOS_PACK.GETID_USUARIO(:P_USERNAME,:P_USUARIO,:STATUS_CODE,:STATUS_DESC);END;'
    const parameters: any ={
    P_USERNAME: userName,
    P_USUARIO : {
        type: oracledb.r,
        dir: oracledb.BIND_OUT
    },
    STATUS_CODE:{
        type: oracledb.NUMBER,
        dir: oracledb.BIND_OUT
    },
    STATUS_DESC:{
        type: oracledb.STRING,
        dir: oracledb.BIND_OUT
    }

    }

    // base de datos

    try {

        let result = await OracleDB.execQuery(sql, parameters, true);
        let outBinds = result.outBinds;
        return outBinds;
        
    } catch (error) {
        console.log({error});
        return error;
        
    }

    
}

