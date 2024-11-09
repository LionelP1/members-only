const passport = require('passport');
const bcrypt = require('bcryptjs');

exports.getLoginPage = (req, res) => {
  res.render('login');
};

exports.getSignupPage = (req, res) => {
  res.render('signup');
};

exports.handleLogin = passport.authenticate('local', {
  successRedirect: '/', //redirect to message page
  failureRedirect: '/login',
  failureFlash: true
});

exports.handleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};