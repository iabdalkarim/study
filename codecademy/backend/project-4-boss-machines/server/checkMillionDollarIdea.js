const checkMillionDollarIdea = (req, res, next) => {
  const totalValue = req.body.numWeeks * req.body.weeklyRevenue;
  if (totalValue >= 1000000) {
    next();
  } else {
    res.status(400).send("Not Million Dollar Idea");
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
