const bcrypt= require('bcryptjs')
const jwt= require('jsonwebtoken')
const lodash= require('lodash')
const usersRepo= require('../repositories/usersRepository')

const hashPasswordMW= async function(req, res, next){
    const {password}=req.body

    if (!password){
        return res.status(400).send({'error': 'Missing password'})
    }

    const hashedPassword= await bcrypt.hash(password, 12)

    req.body.password= hashedPassword
    return next()
}

const registerUser= async function(req, res, next){
    const {name, email, password, role, gender}=req.body

    const userInfo={
        name, email, password, role, gender
    }

    try{
        const user =await usersRepo.addUser(userInfo)
        res.status(200).send(user)
    }
    catch(err){
        res.status(400).send(err)
    }
}

const login= async function(req, res, next){
    const {email, password}= req.body
    if (!email || !email){
        res.status(400).send({"error": "Email/password is not given"})
    }

    const user= await usersRepo.findUserByEmail(email)

    if (!user){
        res.status(400).send({"error": "User not found"})
    }

    try{
        const isMatch= await bcrypt.compare(password, user.password)
        if (!isMatch){
            res.status(400).send({"error": "Invalid password"})
        }
        const response= signInUser(user)
        return res.status(200).send(response)
    }
    catch(err){
        res.status(400).send(err)
    }

}

function signInUser(user){
    const {id, email, role, name}= user

    const token= jwt.sign({id, email, role, name}, process.env.SECRET, {expiresIn: "7 days"})

    return {token, user: {id, email, role, name}}
}

const isAuthenticated= async function(req, res, next){
    const token= req.headers.token

    if (!token){
        res.status(403).send({"error": "Token is missing"})
    }

    try{
        const decodedUser= await jwt.verify(token, process.env.SECRET)
        req.user= decodedUser
        return next()
    }
    catch(err){
        return res.status(403).send({"error": "Invalid token"})
    }
}

const isInRole= function(roles){
    return async function(req, res, next){
        
        const {role}= req.user

        if (lodash.indexOf(roles, role) >= 0){
            return next()
        }

        return res.status(401).send({error: "User's role should be one of: "+roles.join(',')})
    
    }
}

module.exports={
    hashPasswordMW,
    registerUser,
    login,
    isAuthenticated,
    isInRole
}