const {faker} = require('@faker-js/faker')
const knex= require('../knex')
const bcrypt= require('bcryptjs')

const clearDatabase= async function(){
    return knex.raw('TRUNCATE debates, users, endorsements')
}

const closeConnection= async function(){
    return knex.destroy()
}

const addUsers= async function(){
    const hashedPassword= await bcrypt.hash('h', 12)

    await knex('users').insert([
        {
            name: 'h',
            email: 'h@h.com',
            gender: 'female',
            role: 'admin',
            password: hashedPassword
        },
        {
            name: 'g',
            email: 'g@h.com',
            gender: 'female',
            role: 'user',
            password: hashedPassword
        }
    ])
}

const prepareDatabase = async function(){
    await addUsers()

    const user= await knex.select('id')
    .from('users')
    .where({role: 'user'})
    .first()

    const debates= await knex('debates')
    .insert({
        title: faker.lorem.sentence(3),
        description: faker.lorem.sentence(3),
        user_id: user.id
    })
    .returning('*')

    return {user, debate: debates[0]}
}

module.exports= {
    closeConnection,
    clearDatabase,
    prepareDatabase
}