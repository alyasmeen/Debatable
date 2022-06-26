const debateService=require('../services/debatesService')
const router=require('express').Router();
router.post('/', debateService.addDebate)
router.put('/debate/:debateId', debateService.updateDebate)
router.delete('/debate/:debateId', debateService.deleteDebate)
router.get('/', debateService.parseOrderByForDebates, debateService.getDebates)

module.exports = router;