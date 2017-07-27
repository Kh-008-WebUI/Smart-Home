
module.exports = (req, res, next) => {
  if(!req.session.user){
    res.send(500);
  }else{
    next();    
  }
}