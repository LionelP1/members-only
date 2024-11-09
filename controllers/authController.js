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

exports.createUser = async (req, res, next) => {
  const { firstName, lastName, password, confirmPassword, username } = req.body;

  if (password !== confirmPassword) {
      //RENDER ERROR HERE
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)', [
      firstName, lastName, username, hashedPassword
    ]);

    res.redirect('/login');
  } catch (err) {
    return next(err);
  }
};



