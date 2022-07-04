const knex = require("../knex")

const addUser=async function(usersData){
    return knex.insert(usersData)
    .into('users')
    .returning(['email', 'name', 'role', 'id', 'gender'])
}

const findUserByEmail=async function(email){
    return knex.select('password', 'name', 'email', 'id', 'role')
    .from('users')
    .where({email})
    .first()
}

module.exports={
    addUser,
    findUserByEmail
}