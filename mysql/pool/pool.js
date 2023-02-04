const mysql = require('mysql');


const local = {
    connectionLimit : 10,
    host            : 'localhost:3306',
    user            : 'root',
    password        : 'root',
    database        : 'heroku_f17f87d2ebbd799',
    multipleStatements: true
}


const remote = {
    connectionLimit : 10,
    host            : 'us-cdbr-east-06.cleardb.net',
    user            : 'b40830049e3114',
    password        : '514e3fd0',
    database        : 'heroku_f17f87d2ebbd799',
    multipleStatements: true
}

const pool  = mysql.createPool(remote);

module.exports = pool;