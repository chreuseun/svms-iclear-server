var jwtVerify = require('../../reuse/jwtVerify');
var query = require('../../reuse/query')

const getPaymentHistory = async ({res, token, params}) => {
    
    let error  = false;    
    let jwtResult;
    let sqlResult;

    try{
        jwtResult= await jwtVerify(token);
    } catch(err) {
        error  = true; 
    }
    
    if(!jwtResult) {
        error  = true; 
    }

    try{
      sqlResult = await query(_sql.getPaymentHistory, [] );
    } catch (err){
        error  = true;  
    }

    error ? 
    res.sendStatus(401) : 
    res.json({ 
        data:sqlResult,
        keys:[
          'educ_level_id' ,
          'el_name' ,
          'studfname' ,
          'studlname' ,
          'studmname' ,
          'paymentDate' ,
          'course' ,
          'yearlevel' ,
          'cpnum' ,
          'studentUsername' ,
          'amount' ,
          'uploaded_by' ,
          'created_at' ,
          'is_sms' ]
       })
}

let _sql = {
    getPaymentHistory : `
      SELECT
      upd.id AS 'payment_id',
      st.educ_level_id,
        el.name AS 'el_name',
      st.studfname,
        st.studlname,
        st.studmname,
        paymentDate,
        IF(st.course = 'NONE', '', st.course) AS 'course',
        st.yearlevel,
        st.cpnum,
      upd.studentUsername,
        upd.amount,
        upd.uploaded_by,
      st.created_at,
        is_sms
    
    FROM upload_payment_history AS upd
    JOIN student_ AS st ON st.username = upd.studentUsername
    JOIN educ_level AS el ON el.id = st.educ_level_id;
    `

}



module.exports =  getPaymentHistory;


