const router = require('express').Router();

router.get('/deptclearancerecord' , async(req, res)=>{
    const getOneStudentClearanceRecordTosend = require('./function/getOneStudentClearanceRecordTosend');
    args = {
        res,
        params : {
        }
    }

    getOneStudentClearanceRecordTosend(args);

    console.log( `Method: ${req.route.stack[0].method}  ${req.route.path}`);

})

module.exports = router;