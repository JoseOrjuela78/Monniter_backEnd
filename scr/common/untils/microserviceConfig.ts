import OracleDBBonus from "../db/oracledb"
import oracledb from "oracledb"

let configMicroservices = {
    url_optimove:'',
    url_event_listener:''
};

const configInitial = async() =>{
 
    return  await getParameters().then((rows: any) =>{

        function getParameter(value: number) {
            try {
                return (rows.filter(function(item:any) {
                    return (item.CODIGO == value);
                }))[0].VALOR;
            } catch (e) {
                return null;
            }
        }

        configMicroservices.url_optimove = getParameter(277);
        configMicroservices.url_event_listener = getParameter(287);
   
    })
};

const getParameters = async () =>{
    const sql = 'BEGIN GET_PARAMETERS(:result); END;';
    const parameters:any = {
        result: {
            dir: oracledb.BIND_OUT,
            type: oracledb.CURSOR
        }

    };
   
     try {

       const result =  await OracleDBBonus.execQuery( sql, parameters, true, false )
       const outBinds = result.outBinds;
       const cursor =  outBinds.result;
       const rows = await OracleDBBonus.fetchFromCursor(cursor);
       return rows; 
     } catch (error) {
        return error; 
     }

}; 

module.exports = {
    configInitial,
    configMicroservices
};
