const knex = require("../knex")

const addOrUpdateEndorsement=async function(debateId, userId, opinion){
    return knex.insert({
        debate_id: debateId,
        user_id: userId,
        opinion })
    .into('endorsements')
    .onConflict(['debate_id', 'user_id'])
    .merge()
    .returning('*')
}

module.exports={
    addOrUpdateEndorsement
}