

const SUCCESS_JSON_MESSAGE = {
    msg:"success api/ping"
}

const pingPost = (_, response) => {  
    response.json(SUCCESS_JSON_MESSAGE)
    console.log('* POST api/ping')
}

module.exports =  pingPost