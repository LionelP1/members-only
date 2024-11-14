require('dotenv').config();

const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const pool = require('../db/pool');

module.exports = expressSession({
    store: new pgSession({
        pool: pool,
        tableName: 'session',
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
});