const debateService=require('../services/debatesService')
const {isAuthenticated, isInRole}=require('../services/usersService')
const router=require('express').Router();


router.post('/', isAuthenticated, isInRole(['user']), debateService.addDebate)
router.put('/debate/:debateId', isAuthenticated, debateService.updateDebate)
router.delete('/debate/:debateId', isAuthenticated, debateService.deleteDebate)
router.get('/', debateService.parseOrderByForDebates, debateService.getDebates)

module.exports = router;