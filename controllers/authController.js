const passport = require('passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const { validationResult } = require('express-validator');

exports.getLoginPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/login', { errors: [], data: [] });
};

exports.getSignupPage = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.render('auth/signup', { errors: [], data: [] });
};

exports.handleLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).render('auth/login', {
        errors: [{ msg: 'Invalid username or password' }],
        data: req.body,
      });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect('/messages');
    });
  })(req, res, next);
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
    const { rows:existingUser } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (existingUser.length > 0) {
      return res.status(400).render('auth/signup', {
        errors: [{ msg: 'Username already taken' }],
        data: req.body,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [
      first_name, last_name, username, hashedPassword
    ]);

    const newUser = rows[0];

    req.login(newUser, (err) => {
      if (err) return next(err);
      res.redirect('/messages');
    });
  } catch (err) {
    return next(err);
  }
};