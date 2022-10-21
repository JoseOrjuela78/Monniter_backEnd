import oracledb from 'oracledb';

class OracleDB {
     private static _instance: OracleDB;
     cnnAttrs:oracledb.PoolAttributes;
     pool: oracledb.Pool; 
     conected:Boolean= true;

     constructor(){
        console.log("Class OracleDB initiallized")
         this.cnnAttrs = {
            user: "MONNITER",
            password: "123456",
            connectString: "localhost",
            poolAlias: "moniterUser"
        }

        this.createPool();
     }

     static async execQuery(query: string, parameters: [], autoCommit:Boolean = false){

        const connection:any = await this.instance.pool.getConnection();
        try {
            let result = await connection.execute(query,parameters,{
                autoCommit
            });

            connection.close();

            return result;

            
        } catch (error) {

            connection.close();
            throw error;
            
        }

     }

     public async closeConnection(){
        try {
            if(this.conected == true){
                await this.pool.close();
                this.conected = false;
                console.log('Desconectado');
            }
            
        } catch (error) {
            throw error;
        }
     }

     public static get instance(){
        return this._instance || (this._instance = new this());
     }

     private async createPool(){
        this.pool = await oracledb.createPool(this.cnnAttrs);
        this.conected = true;
        console.log("Pool created");
     }

}

export default OracleDB;