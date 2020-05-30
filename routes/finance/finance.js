const router = require('express').Router();

router.post('/finance/upload', (req, res) => {

    const insertPaymentHistory = require('./functions/insertPaymentHistory');

    let token = req.headers.authorization
 
    args = {
        res, 
        token ,
        params : req.body.values,
    }

    insertPaymentHistory(args)

    console.log( `Methed: ${req.route.stack[0].method}  ${req.route.path}`);
})

router.get('/finance/payment-history', (req, res) => {
    const getPaymentHistory = require('./functions/getPaymentHistory');

    let token = req.headers.authorization
 
    args = {
        res, 
        token ,
        params : [],
    }

    getPaymentHistory(args)

    console.log( `Methed: ${req.route.stack[0].method}  ${req.route.path}`);
});


module.exports = router
