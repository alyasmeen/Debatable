const endorsementsService=require('../services/endorsementsService')
const {isAuthenticated}=require('../services/usersService')
const router=require('express').Router();


router.post('/:debateId/endorsements', isAuthenticated, endorsementsService.addEndorsement)

module.exports = router;