const debatesRepo= require('../repositories/debatesRepository')
const {parseOrderBy}= require('../helpers/helpers')

const addDebate=async function(req, res){
    let data=req.body;
    data.user_id= req.user.id
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

const getDebates=async function(req, res){
    let {offset, limit, searchTerm, orderBy}= req.query;

    offset= offset?? 0;
    limit = limit?? 10;
    if (limit>100){limit=100}

    try {
    const debates= await debatesRepo.getDebates(offset, limit, searchTerm, orderBy);
    await res.status(200).send(debates);
    }
    catch(err){
        await res.status(400).send(err);
    }
}

const parseOrderByForDebates= async function(req, res, next){
    const {orderBy}= req.query

    if (!orderBy){
        req.query.orderBy= [{column: 'created_at', order: 'desc'}]
    }
    else {
        req.query.orderBy= parseOrderBy(req.query.orderBy)
    }

    return next()
}


module.exports={
    addDebate,
    updateDebate,
    deleteDebate,
    getDebates,
    parseOrderByForDebates
}