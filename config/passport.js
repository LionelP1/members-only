const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      const user = rows[0];
      console.log('User from DB:', user);

      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const user = rows[0];

    if (!user) {
      return done(new Error('User not found'));
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;