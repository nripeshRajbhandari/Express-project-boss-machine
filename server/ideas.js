const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const db = require('./db');

module.exports = ideasRouter;

ideasRouter.param('id',(req,res,next,id) => {    
    const idea = db.getFromDatabaseById('ideas',id);
        if(idea){
            req.idea = idea;
            next();
        } else {
            res.status(404).send();           
        }   
});

ideasRouter.get('/',(req,res,next) => {
    res.status(200).send(db.getAllFromDatabase('ideas'));
});

ideasRouter.get('/:id',(req,res,next) => {
    res.status(200).send(req.idea);    
});

ideasRouter.post('/',checkMillionDollarIdea,(req,res,next) => {
    const newIdea = db.addToDatabase('ideas',req.body);
    if (newIdea) {
        res.status(201).send(newIdea);
    } else {
        res.status(400).send('Invalid New Ideas');
    }
});

ideasRouter.put('/:id',checkMillionDollarIdea,(req,res,next) => {
    const instanceIdea = {...req.body, id: req.idea.id}
    const updatedIdea = db.updateInstanceInDatabase("ideas", instanceIdea);
    if(updatedIdea){
        res.status(200).send(updatedIdea);
    } else {
        res.status(400).send('Invalid Data To Update!!');
    }
});

ideasRouter.delete('/:id',(req,res,next)=>{
    db.deleteFromDatabasebyId('ideas',req.idea.id);
    res.status(200).send();
});