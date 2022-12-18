module.exports = (req, res, next) => {
  if (req.user != 'unauthorized') {
    next();
  }
  else {
    res.status(500).redirect('/');
    next();
  }
  //next();
};
