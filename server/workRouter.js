const workRouter = require('express').Router({mergeParams: true});
const db = require('./db');

workRouter.param('id',(req,res,next,id) =>{
    const work = db.getFromDatabaseById('work', id);
    if(work) {
        req.work = work;
        req.workId = work.id;
        next();
    } else {
        res.status(400).send(`Invalid work id ${id}`)
    }
});

workRouter.get('/',(req,res,next)=>{
    console.log(`minion ID: ${req.minionId}`);
    const minionWorks = db.getWorksFromDatabaseByMinionId('work',req.minionId)
    res.status(200).send(minionWorks);
});

workRouter.post('/',(req,res,next) =>{
    //const newWork = req.body;
    //newWork.minionId = req.minionId;
    //Another method to get the newWork data
    const newWork = {...req.body, minionId: req.minionId};
    if(newWork) {
        if(db.addToDatabase('work',newWork)) {
            res.status(201).send(newWork);
        }
        
    } else {
        res.status(400).send();
    }
});

workRouter.put('/:id',(req,res,next) => {
    const updateWork = {...req.body, id: req.workId};
    const updatedWork = db.updateInstanceInDatabase('work', updateWork);
    if(updatedWork) {
        res.status(200).send(updatedWork);
    } else {
        res.status(400).send('Invalid data to update!!');
    }
});

workRouter.delete('/:id',(req,res,next) => {
    if(db.deleteFromDatabasebyId('work', req.workId)) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = workRouter;