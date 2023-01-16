const mysql = require('mysql');

/*

 check your notion file
 - User: b40830049e3114
- Password: 514e3fd0
- Host: us-cdbr-east-06.cleardb.net
- Database: heroku_f17f87d2ebbd799
*/

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'us-cdbr-east-06.cleardb.net',
    user            : 'b40830049e3114',
    password        : '514e3fd0',
    database        : 'heroku_f17f87d2ebbd799',
    multipleStatements: true
});

module.exports = pool;