const endorsementsService=require('../services/endorsementsService')
const router=require('express').Router();
router.post('/:debateId/endorsements', endorsementsService.addEndorsement)

module.exports = router;