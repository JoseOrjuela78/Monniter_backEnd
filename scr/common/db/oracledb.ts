import oracledb from 'oracledb'

export default class OracleDB { //OracleDB

    private static _instance: OracleDB;
    pool:oracledb.Pool;
    conected: Boolean = false;
    cnnAttrs:oracledb.PoolAttributes;
    private static connection: any;
     

    constructor() {
        
        console.log( "Class initialized")
        
        this.cnnAttrs = {
            connectString:  process.env.DB_HOST_BN    || "LOCALHOST",
            user:           process.env.DB_USER_BN     || "root",
            password:       process.env.DB_PASSWORD_BN || "",
            events:         false,
            externalAuth:   false,
            poolAlias: 'corredor',//'ONL_DBB',
            poolTimeout: 30,
            poolMax: 10,
            poolMin: 1,
            stmtCacheSize:  30
        };
       
        this.createPool();
    }

    static async execQuery( 
        query: string, 
        parameters:oracledb.DBObject, 
        autoCommit:Boolean = false,
        closeConnection: boolean = true){
        
        this.connection = await this.instance.pool.getConnection();
       
        try {
            let result = await this.connection.execute(query, parameters, {
                autoCommit: autoCommit,
                outFormat: oracledb.OUT_FORMAT_OBJECT,
            });
            
           if (closeConnection) {
                //console.log("cerrando conexión execQuery");
                this.connection.close();
                
             }
            
            return result;
        }
        catch (err){
            console.log(err);
            this.connection.close();
            throw err;
        }
    }


    static async fetchFromCursor( resultSet: oracledb.ResultSet,
        closeConnection: boolean = true ){
        
            try {
           
            let result = await resultSet.getRows(0);
            //console.log(result);
            resultSet.close();
            // Cerramos la conexion con el pool de conexiones
      if (closeConnection) {
        //console.log("cerrando conexión fetch");
        this.connection.close();
      }
            return result;
             
               
        }
        catch (err){
            this.connection.close();
            throw err;
        }
    }



    public async closeConnection()
    {   
        try{
            if(this.conected == true)
            {
                await this.pool.close();
                this.conected = false;
                console.log( "Disconnected" );
            }
        }
        catch( err ){
            throw err
        }
    }


    public static get instance(){
        return this._instance || ( this._instance = new this() );
    }

    private async createPool() {
        
        this.pool = await oracledb.createPool( this.cnnAttrs );
        this.conected = true;
        console.log("Pool created");
        
            
    }
}
