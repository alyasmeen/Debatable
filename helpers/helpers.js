const lodash= require('lodash')

const parseOrderBy = function(orderByString){
    const orderByStringsArray= orderByString.split(',')

    return lodash.map(orderByStringsArray, function(field){
        if (field.indexOf('-')===0){
            return {
                column: field.substring(1),
                order: 'desc'
            }
        }
        return {
            column: field
        }

    })
}


module.exports= {
    parseOrderBy
}