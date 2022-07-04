const usersService=require('../services/usersService')
const router=require('express').Router();
router.post('/register', usersService.hashPasswordMW, usersService.registerUser)
router.post('/login', usersService.login)

module.exports = router;