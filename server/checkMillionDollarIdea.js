const checkMillionDollarIdea = (req,res,next) => {
    const {weeklyRevenue, numWeeks} = req.body;
    const totalValue = Number(weeklyRevenue) * Number(numWeeks);
    if(!weeklyRevenue || !numWeeks || isNaN(totalValue) || totalValue <1000000) {
        res.status(400).send('this idea is not worth a million dollar!!');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

