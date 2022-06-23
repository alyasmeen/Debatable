const knex = require("../knex")

const addDebate=async function(debateData){
    return knex.insert(debateData).into('debates').returning('*')
}

const updateDebate=async function(debateId, debateData){
    return knex('debates').where({id: debateId, isDeleted: false})
    .update(debateData).returning('*')
}

const markDebateAsDeleted=async function(debateId){
    return knex('debates').where({id: debateId})
    .update({isDeleted: true})
}

module.exports={
    addDebate,
    updateDebate,
    markDebateAsDeleted
}