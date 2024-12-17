const express = require('express');
const apiRouter = express.Router();
const db = require('./db');
const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingRouter = require('./meetings');

apiRouter.use('/minions', minionsRouter);
apiRouter.use('/ideas', ideasRouter);
apiRouter.use('/meetings',meetingRouter);

apiRouter.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || '';
    res.status(status).send(message); 
});


module.exports = apiRouter;
