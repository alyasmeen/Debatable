const debateService=require('../services/debatesService')
const router=require('express').Router();
router.post('/', debateService.addDebate)
router.put('/debate/:debateId', debateService.updateDebate)
router.delete('/debate/:debateId', debateService.deleteDebate)

module.exports = router;