exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.redirectIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return res.redirect('/messages');
  }
  next();
};
