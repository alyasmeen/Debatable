const { query } = require("express")
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

const getDebates=async function(offset, limit, searchTerm, orderBy){
    return knex.select('id', 'title', 'description', 'created_at')
    .from('debates').where({isDeleted: false})
    .modify(function(query){
        if (searchTerm){
            query.whereILike('title', '%'+searchTerm+'%')
            .orWhereILike('description', '%'+searchTerm+'%')
        }
    })
    .offset(offset).limit(limit).orderBy(orderBy)
}

module.exports={
    addDebate,
    updateDebate,
    markDebateAsDeleted,
    getDebates
}