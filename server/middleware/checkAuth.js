const production = 'production' === process.env.NODE_ENV;

module.exports = (req, res, next) => {
  if (!req.session.user && production) {
    res.statusMessage = "Authorization failed.";
    res.status(500).end();
  } else {
    next();
  }
};
