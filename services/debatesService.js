const debatesRepo= require('../repositories/debatesRepository')

const addDebate=async function(req, res){
    let data=req.body;
    try {
    const insertedDebate=await debatesRepo.addDebate(data);
    await res.status(200).send(insertedDebate);
    }
    catch(err){
        await res.status(400).send(err);
    }
}

const updateDebate=async function(req, res){
    const {debateId}= req.params;
    let data=req.body;
    try {
    const debate=await debatesRepo.updateDebate(debateId, data);
    await res.status(200).send(debate);
    }
    catch(err){
        await res.status(400).send(err);
    }
}

const deleteDebate=async function(req, res){
    const {debateId}= req.params;
    try {
    await debatesRepo.markDebateAsDeleted(debateId);
    await res.status(204).end();
    }
    catch(err){
        await res.status(400).send(err);
    }
}

module.exports={
    addDebate,
    updateDebate,
    deleteDebate
}