module.exports = (req, res, next) => {
  if (req.user != 'unauthorized') {
    next();
  }
  res.status(500).send({ msg: req.errorMessge })
};
