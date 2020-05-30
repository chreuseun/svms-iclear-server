const router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
// secret key
const secretkey = require('../../auth/secretkey');


router.get('/test', (req, res) => {

    res.json({name:"eunille", response:"OK",timestamp: Date.now(), method:'GET'})


    console.log('GET-HEADERS: ',req.headers)
    console.log('GET-QUERY: ',req.query)

    console.log( `Methed: ${req.route.stack[0].method}  ${req.route.path}` );

   

})

router.post('/test', (req, res) => {

    res.json({name:"eunille", response:"OK",timestamp: Date.now(), method:'POST'})

    console.log('POST-HEADERS: ',req.headers)
    console.log('POST-BODY: ',req.body)

})


module.exports = router