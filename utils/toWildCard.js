const toWildCard = (stringParams = '', shouldFindAll = true) => {
    const finalStringParams = stringParams || ''
    if(shouldFindAll){
        return `%${finalStringParams === 'ALL' ? '' : finalStringParams}%`
    }

    return `%${finalStringParams}%`
} 

module.exports = toWildCard