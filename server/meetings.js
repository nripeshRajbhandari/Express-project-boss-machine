const meetingRouter = require('express').Router();
const db = require('./db');

meetingRouter.get('/',(req,res,next) => {
    res.status(200).send(db.getAllFromDatabase('meetings'));
});

meetingRouter.param('id',(req,res,next,id) =>{
    const requestedMeeting = db.getFromDatabaseById('meetings',id);
    if(requestedMeeting) {
        req.meeting = requestedMeeting ;
        next();
    } else {
        res.status(400).send('Invalid meeting ID');
    }
});

meetingRouter.get('/:id',(req,res,next) => {
    res.status(200).send(req.meeting);
});

meetingRouter.post('/',(req,res,next) => {
    const newMeeting = db.createMeeting();
    if(newMeeting){
        res.status(200).send(newMeeting);
    } else {
        res.status(400).send();
    }
});

module.exports = meetingRouter;
