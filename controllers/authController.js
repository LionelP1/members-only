const passport = require('passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const { validationResult } = require('express-validator');

exports.getLoginPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/login');
};

exports.getSignupPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/signup', { errors: [], data: [] });
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

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('auth/signup', {
        errors: errors.array(),
        data: req.body,
      });
    }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [
      first_name, last_name, username, hashedPassword
    ]);

    const newUser = rows[0];
    console.log(newUser);

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.redirect('/messages');
    });
  } catch (err) {
    return next(err);
  }
};