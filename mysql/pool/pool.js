const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-04.cleardb.com',
    user            : 'bd2dd5789ec302',
    password        : '317ed164',
    database        : 'heroku_ca66fe3f54014ac',
    multipleStatements: true
});

module.exports = pool;