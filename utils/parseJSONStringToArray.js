const parseJSONStringToArray = (jsonString = '[]', defaultValue = []) =>{
    try{
        const parsedJSONString = JSON.parse(jsonString)

        return Array.isArray(parsedJSONString) ? parsedJSONString : defaultValue
    }catch {
        return defaultValue
    }
}

module.exports = parseJSONStringToArray