const production = 'production' === process.env.NODE_ENV;

module.exports = (req, res, next) => {
  if(!req.session.user && production){
    res.send(500);
  }else{
    next();
  }
}