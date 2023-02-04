const mysqlPool =require('../mysql/pool/pool') 

const asyncMySQLOperation = ({ sql = null,params = []} = {}) => {
    return new Promise((resolve, reject)=>{
        try{
            if(!sql){
                throw new Error(`falsey value for SQL query`)
            }


            mysqlPool.getConnection((connectionError, connection) => {
                try{           
                    if(connectionError){
                        reject(new Error(`MYSQL_CONNECTION_ERR: ${connectionError}`));
                    }

                    connection.query( sql, params, (queryError, results, _) => { 
                        connection.release()
                        if(queryError){  
                            reject( new Error(`QUERY_ERR: ${queryError}`));
                        }

                        resolve(results)
                    })
                }catch(mysqlPoolConnectionError){
                    reject( new Error(`MYSQL_POOL_CONNETION: ${queryError}`));
                }
            })

        }catch(asyncMySQLOperationError){
            reject(new Error(`asyncMySQLOperationError: ${asyncMySQLOperationError}`))
        }
       
    })
}


const mySQLCommander = async ({sqlQuery = null,params = []} ={}) => {
    const response = {
        success_sql: false,
        error_message_sql: null,
        results_sql: null,

    }
 
    try{
        response.results_sql = await asyncMySQLOperation({sql:sqlQuery, params})
        response.success_sql = true;
    }catch(mySQLCommanderError){
        response.error_message_sql = `${mySQLCommanderError}`
    }

    return response
} 

module.exports = mySQLCommander