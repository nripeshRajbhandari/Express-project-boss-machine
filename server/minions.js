const minionsRouter = require('express').Router();
const db = require('./db');

minionsRouter.param('id',(req,res,next,id) => {
    const minion = db.getFromDatabaseById('minions',id);
    if(minion){
        req.minion = minion;
        req.minionId = minion.id; 
        next();
    } else {
        const error = new Error('Invalid minion ID');
        error.status = 400;
        next(error);
    }
});

minionsRouter.get('/', (req,res,next) => {
    const data = db.getAllFromDatabase('minions');
    if(data){
        //create work for each created minions
        db.getAllFromDatabase('work');
        res.status(200).send(db.getAllFromDatabase('minions'));
    } else {
        const error = new Error(`Couldn't find minions records`);
        error.status = 400;
        next(error);
    }    
});

minionsRouter.get('/:id', (req,res,next) => {
    res.status(200).send(req.minion); 
});

minionsRouter.post('/', (req,res,next) =>{
    const newMinion = req.body;
    if(db.addToDatabase('minions',newMinion)) {
        res.status(201).send(newMinion);
    } else {
        const error = new Error('Invalid minion data');
        error.status = 400;
        next(error);
    }    
});

minionsRouter.put('/:id',(req,res,next)=>{
    let minionToUpdateData = req.body;
    minionToUpdateData = {...minionToUpdateData,id: req.minionId};
    console.log(minionToUpdateData);
    if(db.updateInstanceInDatabase('minions',minionToUpdateData)){
        res.status(200).send(minionToUpdateData);
    } else {
        const error = new Error('Invalid minion data to update');
        error.status = 400;
        next(error);
    }
});

minionsRouter.delete('/:id',(req,res,next) => {
    db.deleteFromDatabasebyId('minions', req.minionId)
    res.status(200).send({msg:'Minion removed successfully!!'});
});


const minionsWorkRouter = require('./workRouter');

minionsRouter.use('/:id/work', minionsWorkRouter);

module.exports = minionsRouter; 





