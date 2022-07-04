const {describe, it}= require('mocha')
const chai= require('chai')
chai.should()
const {faker} = require('@faker-js/faker')
const knex= require('../knex')
const request= require('supertest')
const {app}=require('../app')
const testHelper= require('./testHelper')

let testData;

describe('testing debatable project', function(){
    beforeEach(async function(){
        await testHelper.clearDatabase()
        testData= await testHelper.prepareDatabase()
    })

    after(async function(){
        await testHelper.closeConnection()
    })

    describe('testing endorsements', async function(){
        it('should create an endorsement correctly if all conditions are met', async function(){
            const loginResponse= await request(app)
            .post('/users/login')
            .send({
                email: 'h@h.com',
                password: 'h'
            })
            .expect(200)

            const token= loginResponse.body.token
            token.should.not.be.null

            const opinion= faker.helpers.arrayElement(['for', 'against', 'neutral'])

            const endorsementResponse = await request(app)
            .post('/debates/debate/'+testData.debate.id+'/endorsements')
            .set('token', token)
            .send({opinion})
            .expect(200)

            const endorsement= endorsementResponse.body[0]
            endorsement.user_id.should.equal(loginResponse.body.user.id)
            endorsement.debate_id.should.equal(testData.debate.id)
            endorsement.opinion.should.equal(opinion)
        })

        it('should not create endorsement if the user is not logged in (token is missing)', async function(){
            const opinion= faker.helpers.arrayElement(['for', 'against', 'neutral'])

            await request(app)
            .post('/debates/debate/'+testData.debate.id+'/endorsements')
            .send({opinion})
            .expect(403)

            const endorsements = await knex.select('id').from('endorsements')
            endorsements.length.should.equal(0)
        })

        it('should not create two endorsements if the user changed the endorsement', async function(){
            const loginResponse= await request(app)
            .post('/users/login')
            .send({
                email: 'h@h.com',
                password: 'h'
            })
            .expect(200)

            const token= loginResponse.body.token
            token.should.not.be.null

            const opinions= faker.helpers.arrayElements(['for', 'against', 'neutral'], 2)

            const endorsementResponse1 = await request(app)
            .post('/debates/debate/'+testData.debate.id+'/endorsements')
            .set('token', token)
            .send({opinion: opinions[0]})
            .expect(200)

            const endorsementResponse2 = await request(app)
            .post('/debates/debate/'+testData.debate.id+'/endorsements')
            .set('token', token)
            .send({opinion: opinions[1]})
            .expect(200)

            const dbResponse= await knex.count('*').from('endorsements')
            dbResponse[0].count.should.equal('1')

            const storedEndorsement = await knex.select('opinion').from('endorsements').first()
            storedEndorsement.opinion.should.equal(opinions[1])
        })
    })
})