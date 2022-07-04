const endorsementsRepo= require('../repositories/endorsementRepository')

const addEndorsement=async function(req, res){
    let data=req.body;
    let {debateId}= req.params;
    try {
    const insertedEndorsement=await endorsementsRepo.addOrUpdateEndorsement(debateId, req.user.id, data.opinion);
    await res.status(200).send(insertedEndorsement);
    }
    catch(err){
        await res.status(400).send(err);
    }
}

module.exports={
    addEndorsement
}