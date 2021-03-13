
login = ({res, loginCred, pool, _sql ,bcrypt, jwt, secretkey}) => {

    const error = {msg:"denied"}
    const {username, password} = loginCred;
    
    if( username && password ) {
        var params = [ username, password ];

        pool.getConnection( (err,connection) => {

            console.log('CONNECTION IN LOGIN ERROR: ', err ? err : 'NO ERROR')
            
            if(err) {
                res.json({error});             
            } else {
                connection.query(_sql.select_1_user,params[0],(err, results) => {
                    // When done with the connection, release it.
                    connection.destroy(); 
                    
                    // If ERROR
                    if(err || results.length === 0 ) {
                        res.json({error})
                    }
                    // if Log 
                    else if(results[0].lock_meter >= 5 || results[0].is_locked === 1) {
                        
                        results[0].is_locked === 1 ? 
                        res.json({msg:'account locked'})
                        // res.json({err:"7"})   
                        :
                        
                        // update account_id locked
                        pool.getConnection((err, connection) => {
                            if(err){
                                res.json({error})
                            } else {
                                connection.query(_sql.update_account_to_locked, [results[0].acc_id], (err, results) => {
                                    if(err) {
                                        res.json({error})
                                    } else {
                                        res.json({msg:'account locked'})
                                        // res.json({err:"6"})  
                                    }
                                })
                            }
                        })
                    } else {
                        // compare- password here to hash
                        bcrypt.compare(password , results[0].password, (err, status) => {
                            if(err){
                                // res.json({err:"4"}) 
                                res.json({error})
                            }else{
                                
                                const {acc_id:id, username, user_type_id, traditional_dept, violation_dept, activity_dept} = results[0];

                                const payload = {
                                    id,
                                    username,
                                    user_type_id,
                                    traditional_dept,
                                    violation_dept,
                                    activity_dept
                                };

                                status ?  
                                    // CREATE TOKEN and SEND TO THE CLIENT
                                    jwt.sign(payload, secretkey, { expiresIn: '24h' },function(err, token) {
                                        res.send({msg:"success", token, user_details:payload})
                                    })  :  
                                    pool.getConnection( (err,connection) => {
                                        if(err) {
                                            res.json({error})
                                            // res.json({err:"erre4"})  
                                        } else {                             
                                            pool.query(_sql.insert_account_login_logs, results[0].acc_id,(err, results) => {
                                                connection.destroy(); 

                                                if(err){
                                                    res.json({error})  
                                                    // res.json({err:"erre3"})  
                                                } else {
                                                    res.json({error}) 
                                                    // res.json({err:"erre2"})  
                                                }
                                            })
                                        }
                                    })
                            }       
                        }); 
                    }
                });
            }
        })

    } else {
        res.json({err:"er1"})  
    } 
}

deny = (res) => res.json({msg: 'denied'})

module.exports = login;
