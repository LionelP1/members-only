const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const pool = require("../db/pool");

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

      const user = result.rows[0];

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

// Serialize user ID to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session using their ID
passport.deserializeUser(async (id, done) => {
  try {
    // SQL query to find the user by ID
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return done(new Error('User not found'));
    }

    const user = result.rows[0];
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;