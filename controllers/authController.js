const passport = require('passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');

exports.getLoginPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/login');
};

exports.getSignupPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/signup');
};

exports.handleLogin = passport.authenticate('local', {
  successRedirect: '/messages',
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

exports.createUser = async (req, res, next) => {
  const { first_name, last_name, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
      //RENDER ERROR HERE
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [
      first_name, last_name, username, hashedPassword
    ]);

    res.redirect('/messagePage');
  } catch (err) {
    return next(err);
  }
};



